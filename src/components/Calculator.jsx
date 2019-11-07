import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import { noop } from '../utils';

const keys = [
  { label: 'C', value: 'RESET', hotkey: 'r' },
  { label: 'CE', value: 'CLEAR_VALUE', hotkey: 'c' },
  {
    label: '⌫', value: '⌫', hotkey: 'backspace', rowspan: 2,
  },
  { label: '1', value: '1', hotkey: '1' },
  { label: '2', value: '2', hotkey: '2' },
  { label: '3', value: '3', hotkey: '3' },
  { label: '+', value: 'add', hotkey: '+' },
  { label: '4', value: '4', hotkey: '4' },
  { label: '5', value: '5', hotkey: '5' },
  { label: '6', value: '6', hotkey: '6' },
  { label: '-', value: 'sub', hotkey: '-' },
  { label: '7', value: '7', hotkey: '7' },
  { label: '8', value: '8', hotkey: '8' },
  { label: '9', value: '9', hotkey: '9' },
  { label: '×', value: 'mul', hotkey: '*' },
  { label: '±', value: 'sign', hotkey: 'p' },
  { label: '0', value: '0', hotkey: '0' },
  { label: '.', value: '.', hotkey: '.' },
  { label: '÷', value: 'div', hotkey: '/' },
  { label: 'π', value: 'pi', hotkey: 'ctrl+p' },
  { label: '√', value: 'sqrt', hotkey: 'ctrl+c' },
  { label: '𝒙²', value: 'sq', hotkey: 'ctrl+v' },
  { label: '=', value: 'eq', hotkey: '=' },
];

const Calculator = ({ displayText, displaySymbol, handleKeyClick }) => {
  const currentOperation = keys.find(key => key.value === displaySymbol);
  const displaySymbolLabel = (currentOperation && currentOperation.label) || '';
  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="screen">
          <span className="text">{displayText}</span>
          <span className="symbol">{displaySymbolLabel}</span>
        </div>
        <div className="keys">
          {
            keys.map((key, index) => (
              <Button
                key={key.value === 'empty' ? `${key.value}${index}` : key.value}
                className="key"
                style={{
                  width: key.rowspan * 50,
                }}
                hotkey={key.hotkey}
                onClick={() => handleKeyClick(key.value)}
              >
                {key.label}
              </Button>
            ))
          }
        </div>
      </div>
    </div>
  );
};

Calculator.propTypes = {
  displayText: PropTypes.string,
  displaySymbol: PropTypes.string,
  handleKeyClick: PropTypes.func,
};

Calculator.defaultProps = {
  displayText: '0',
  displaySymbol: '',
  handleKeyClick: noop,
};

export default Calculator;
