import React from 'react';
import './css/ScrollDownArrow.css';
import { FaChevronDown } from 'react-icons/fa';

const ScrollDownArrow = React.forwardRef((props, ref) => {
  return (
    <div className="scroll-down-arrow" ref={ref}>
      <FaChevronDown className="arrow" />
      <FaChevronDown className="arrow" />
      <FaChevronDown className="arrow" />
    </div>
  );
});

ScrollDownArrow.displayName = 'ScrollDownArrow';

export default ScrollDownArrow;
