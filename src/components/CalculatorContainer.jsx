import React, { useState } from 'react';

import Calculator from './Calculator';
import CalculatorBrain from './CalculatorBrain';

const brain = new CalculatorBrain();

const CalculatorContainer = () => {
  const [displayText, setDisplayText] = useState('0');
  const [displaySymbol, setDisplaySymbol] = useState('');

  const handleKeyClick = (key) => {
    const { result, symbol } = brain.calculate(key);
    setDisplayText(result);
    setDisplaySymbol(symbol);
  };

  return (
    <Calculator
      displayText={displayText}
      displaySymbol={displaySymbol}
      handleKeyClick={handleKeyClick}
    />
  );
};

export default CalculatorContainer;
