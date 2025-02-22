import React from 'react';
import './css/ScrollDownArrow.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ScrollUpArrow = () => {
  return (
    <div className="scroll-down-arrow d-flex flex-column justify-content-center">
      <FaChevronUp className="arrow" />
      <FaChevronUp className="arrow" />
    </div>
  );
};

export default ScrollUpArrow;
