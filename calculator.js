// 2) Create constructor by using class
// How number calculated is stored
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      // 3-2) Calls clear function
      this.clear()
    }
  
    // Functions

    // 3-1) Clear function
    clear() {
      // Clears current and previous operand
      this.currentOperand = ''
      this.previousOperand = ''
      // No operation is selected when cleared
      this.operation = undefined
    }
  
    // 10-2) Delete Function
    delete() {
      // Use slice method to delete the last digit
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      // 6) Fixes multiple decimal issue in 5.4
      // If the number is decimal and checks if decimal is already in the line then stop further decimals to be added
      if (number === '.' && this.currentOperand.includes('.')) return
      // 5.3) Test that it shows the number updated
    // Currently only shows one number at a time
    // this.currentOperand = number
    // 5.4) Allows to set number to be appended and not added string so multiple number will be shown
    // Issues with decimal being selected multiple times
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      // 7-2) sets this operation to the operation selected
      this.operation = operation
      // places currentOperand to previousOperand
      this.previousOperand = this.currentOperand
      // clears out current operand
      this.currentOperand = ''
    }
  
    compute() {
      // 8-2) create variables
      let computation
      // string previousOperand parsed to number
      const prev = parseFloat(this.previousOperand)
      // string currentOperand parsed to number
      const current = parseFloat(this.currentOperand)
      // checks for Not a Number in variables created and stops further execution
      if (isNaN(prev) || isNaN(current)) return
      // 8-3) Switch acts as  multiple 'if' statements.
      // Switch will evaluate expression to match the value to the case clause
      switch (this.operation) {
        // Addition calculation and break to complete function
        case '+':
          computation = prev + current
          break
        // Subtraction calculation
        case '-':
          computation = prev - current
          break
        // Multiplication calculation
        case '×':
          computation = prev * current
          break
        // Division calculation
        case '÷':
          computation = prev / current
          break
        // When no values in case are selected then value is unvalid and no computation is done
        default:
          return
      }
      // 8-4) Call on new values
      // currentOperand to show computation
      this.currentOperand = computation
      // removes previous operation to undefined
      this.operation = undefined
      // makes previousOperand to blank
      this.previousOperand = ''
      // issue clear function not working. See fix on (9) allClearButton
    }
  
    // 12-1) Adds boundaries to separate digits to show , every 3rd digit from right to left
    getDisplayNumber(number) {
      // 12-3) Fix on decimal point issue by declaring constant numbers to string
      const stringNumber = number.toString()
      // constant integer to have a 0 infront of decimal point
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      // constant digits after the decimal
      const decimalDigits = stringNumber.split('.')[1]
      // 12-4) Initialize value of integerDisplay
      let integerDisplay
      // if integerDigits is not a number
      if (isNaN(integerDigits)) {
        // display as blank
        integerDisplay = ''
      } else {
        // else integerDisplay is integerDigits to english sting with 1 decimal point max
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      // if decimalDigit has a value
      if (decimalDigits != null) {
        // numbers to be displayed with decimal and decimalDigits
        return `${integerDisplay}.${decimalDigits}`
      } else {
        // display number with no decimal
        return integerDisplay
      }
      // issue current operand value not clearing. Issue fixed on (12-5) updateDisplay
      // --------------
      // 12-2) Declare a constant to change string to number
      // const floatNumber = parseFloat(number)
      // if floatNuber is not a number, return empty
      // if (isNaN(floatNumber)) return ''
      // update return number to contain float number to specify languate to english
      // return floatNumber.toLocaleString('en')
      // issues with decimal point - no 0 displayed before and added 0s after. Fixed on (12-3)
      // ---------------
      // 12-1-1) Return number in display value
      // return number
    }
  
    updateDisplay() {
      // 7-3) Check for current Operand for blank value and does not allow further execution
      // if (this.currentOperand === '') return
      // 7-4) Calls the computation function
      // if previousOperand has a value then compute
      // if (this.previousOperand !== '') {
      //   this.compute()
      // }
      // Create equals functions start with (8-1) Equals button
      // ---------------
      // 5-2) Test that operands work
      // Sets the text value in the large text display
      // this.currentOperandTextElement.innerText = this.currentOperand
      // ---------------
      // 7-2) Displays current operand in previous operand
      // this.previousOperandTextElement.innerText = this.previousOperand
      // issue allows blank value - fixed on 7-3
      // issue when operation is clicked, no calculation is done - fixed on 7-4
      // ---------------
      // 11-1) Tidy up display
      // this.currentOperandTextElement.innerText = this.currentOperand
      // If there is a calculation
      // if (this.operation != null) {
        // Get previousOperand value and place in previousOperandTextElement
        // this.previousOperandTextElement.innerText = this.previousOperand
      // } else {
        // contatination of previousOperand and operation to show in previousOperandTextElement
      //   this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
      // }
      // 12-1-2) Similar to (11-1) above with  getDisplay Function inserted in updateDisplay
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        // 12-5) Update previousOperandTextElement display
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  // 1) Declare constant variables
  // All number buttons
  const numberButtons = document.querySelectorAll('[data-number]')
  // All operation buttons (+, -, *, /0)
  const operationButtons = document.querySelectorAll('[data-operation]')
  // = button
  const equalsButton = document.querySelector('[data-equals]')
  // DEL buttons
  const deleteButton = document.querySelector('[data-delete]')
  // AC button
  const allClearButton = document.querySelector('[data-all-clear]')
  // Calculation string display (smaller text)
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  // Calculated and current preview text display (larger text)
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  // 4) Define class from construction 
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  // 5-1) Select number buttons
  numberButtons.forEach(button => {
    // whenever user clicks on number button
    button.addEventListener('click', () => {
      // adds what is in that number button (5-4) appendNumber Function
      calculator.appendNumber(button.innerText)
      // updates display values (5-2) updateDisplay Function
      calculator.updateDisplay()
    })
  })
  
  // 7-1) Select operation buttons
  // Similar to select operation buttons
  operationButtons.forEach(button => {
    // whenever user clicks on operation button
    button.addEventListener('click', () => {
      // Chooses operation for calculation (7-2) chooseOperation Function
      calculator.chooseOperation(button.innerText)
      // updates display values (7-3) updateDisplay Function
      calculator.updateDisplay()
    })
  })
  
  // 8-1) Select = button
  equalsButton.addEventListener('click', button => {
    // calls on compute function (8-2) compute Function
    calculator.compute()
    // updates display values
    calculator.updateDisplay()
  })
  
  // 9) Selects AC button
  allClearButton.addEventListener('click', button => {
    // calls on clear Function in calculator class to clear calculator
    calculator.clear()
    // updates display
    calculator.updateDisplay()
  })
  
  // 10-1) Selects DEL button
  deleteButton.addEventListener('click', button => {
    // Calls on delete Function within class calculator to delete last digit (10-2) delete
    calculator.delete()
    // updates display
    calculator.updateDisplay()
  })

  function closeWindow() {
    if (confirm("Thank you for using Calculator. Are you sure you want to quit?")){
        close();
    }
}