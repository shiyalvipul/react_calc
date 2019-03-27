const OperationTypes = {
  CONSTANT: 'CONSTANT',
  UNARY: 'UNARY',
  BINARY: 'BINARY',
  EQUALS: 'EQUALS',
};

const operations = {
  π: { type: OperationTypes.CONSTANT, value: Math.PI },
  e: { type: OperationTypes.CONSTANT, value: Math.E },
  '√': { type: OperationTypes.UNARY, operation: Math.sqrt },
  '±': { type: OperationTypes.UNARY, operation: operand => -operand, preventChangeInTypingState: true },
  '+': { type: OperationTypes.BINARY, operation: (operand1, operand2) => operand1 + operand2 },
  '-': { type: OperationTypes.BINARY, operation: (operand1, operand2) => operand1 - operand2 },
  '×': { type: OperationTypes.BINARY, operation: (operand1, operand2) => operand1 * operand2 },
  '÷': { type: OperationTypes.BINARY, operation: (operand1, operand2) => operand1 / operand2 },
  '=': { type: OperationTypes.EQUALS },
};

const pendingBinaryOperation = (symbol, operation, firstOperand) => ({
  symbol,
  operation,
  firstOperand,
  performPendingOperation: secondOperand => operation(firstOperand, secondOperand),
});


class CalculatorBrain {
  constructor() {
    this._accumulator = '0';
    this._isTyping = false;
    this._pendingBinaryOperation = null;
    this._performOperation = this._performOperation.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  _performOperation(symbol) {
    const {
      type, value, operation, preventChangeInTypingState,
    } = operations[symbol] || {};
    switch (type) {
      case OperationTypes.CONSTANT:
        this._accumulator = String(value);
        break;
      case OperationTypes.UNARY:
        this._accumulator = String(operation(Number(this._accumulator)));
        break;
      case OperationTypes.BINARY: {
        this._pendingBinaryOperation = pendingBinaryOperation(
          symbol, operation, Number(this._accumulator),
        );
        break;
      }
      case OperationTypes.EQUALS:
        if (this._pendingBinaryOperation) {
          this._accumulator = String(this._pendingBinaryOperation
            .performPendingOperation(Number(this._accumulator)));
          this._pendingBinaryOperation = null;
        }
        break;
      default:
        break;
    }
    if (!preventChangeInTypingState) {
      this._isTyping = false;
    }
  }

  calculate(key) {
    if (key) {
      switch (key) {
        case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
          this._accumulator = this._isTyping ? `${this._accumulator}${key}` : key;
          if (this._accumulator === '0') {
            this._isTyping = false;
          } else {
            this._isTyping = true;
          }
          break;
        case '.':
          if (this._accumulator.includes('.')) return this._accumulator;
          this._accumulator = `${this._accumulator}${key}`;
          break;
        case '⌫':
          if (this._isTyping) {
            if (Math.abs(Number(this._accumulator)) > 10) {
              this._accumulator = this._accumulator.slice(0, -1);
            } else {
              this._accumulator = '0';
              this._isTyping = false;
            }
          }
          break;
        case 'RESET':
          this._accumulator = '0';
          this._isTyping = false;
          this._pendingBinaryOperation = null;
          break;
        case 'CLEAR_VALUE':
          if (this._isTyping) {
            this._accumulator = '0';
            this._isTyping = false;
          }
          break;
        default:
          this._performOperation(key);
          break;
      }
    }
    return {
      result: this._accumulator,
      symbol: (!this._isTyping && this._pendingBinaryOperation && this._pendingBinaryOperation.symbol) || '',
    };
  }
}

export default CalculatorBrain;
