import React from 'react';
import './css/ScrollDownArrow.css';
import { FaChevronDown } from 'react-icons/fa';

const ScrollDownArrow = () => {
  return (
    <div className="scroll-down-arrow">
      <FaChevronDown className="arrow" />
    </div>
  );
};

export default ScrollDownArrow;
