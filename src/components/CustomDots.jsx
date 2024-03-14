import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomDots = ({ totalDots, dotWidth, activeColor, inactiveColor }) => {
  const [activeDot, setActiveDot] = useState(0);

  const handleClick = (index) => {
    setActiveDot(index);
  };

  const calculateActiveDotPosition = () => {
    return { left: `${activeDot * dotWidth}px` };
  };

  return (
    <div className="custom-dots-container">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          className={`custom-dot ${activeDot === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          aria-label={`Dot ${index + 1}`}
          aria-current={activeDot === index ? 'true' : null}
          style={{
            width: activeDot === index ? '20px' :`5px`,
            height: `${dotWidth}px`,
            borderRadius: activeDot === index? '20px' : '50px',
            margin: '0 5px',
            backgroundColor: activeDot === index ? activeColor : inactiveColor,
            border: `1px solid ${activeDot === index ? activeColor : 'transparent'}`,
            cursor: 'pointer',
          }}
        />
      ))}
      <div
        className="active-dot"
        style={{
          position: 'absolute',
          bottom: '0',
          left: calculateActiveDotPosition().left,
          width: `${dotWidth}px`,
          height: '2px',
          backgroundColor: activeColor,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

CustomDots.propTypes = {
  totalDots: PropTypes.number.isRequired,
  dotWidth: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

CustomDots.defaultProps = {
  activeColor: 'black',
  inactiveColor: 'grey',
};

export default CustomDots;
