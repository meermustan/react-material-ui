import React, { useState } from 'react';
// import './CustomDots.css'; // Import your CSS file for styling

const CustomDots = ({ totalDots }) => {
  const [activeDot, setActiveDot] = useState(0);

  const handleClick = (index) => {
    setActiveDot(index);
  };

  const calculateActiveDotPosition = () => {
    return { left: `${activeDot * 50}px` }; // Assuming each dot has a width of 50px
  };

  return (
    <div className="custom-dots-container">
      <div className="active-dot" style={calculateActiveDotPosition()} />
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`custom-dot ${activeDot === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default CustomDots;


