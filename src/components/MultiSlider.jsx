import React from 'react';
import Tooltip,{ tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { makeStyles } from '@mui/styles'; // Import for custom styles

const useStyles = makeStyles((theme) => ({
  tooltip: {
    transform: 'translateY(-50%)', 
    height: '100%',
    backgroundColor: 'inherit', 
    borderRadius: '4px',
    height: "calc(100% + 60px)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&.MuiSlider-thumb:hover':{
        boxShadow: 'none',
    },
  },
  tooltipLine: {
    border: '1px solid #1976d2',
    flex: 1,
  },
  tooltipCircle: {
    width: '100%',
    padding: '4px 6px',
    height: '24px',
    backgroundColor: '#1976d2', 
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [tooltipClasses.popper]: {
    backgroundColor: 'transparent',
  },
  tooltipValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));

  

function ValueLabelComponent(props) {
  const { children, value } = props;
  const classes = useStyles();

  return (
    <Tooltip enterTouchDelay={0} placement="top"  componentsProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: {
              backgroundColor: (theme) => "green",
              zIndex: "-10",
              height: '0px',
              backgroundColor: 'transparent',
            }
          }
        }
      }} 
      title={
      <div className={classes.tooltip}>
        <div className={classes.tooltipCircle}>
          <span className={classes.tooltipValue}>{value}</span>
        </div>
        <div className={classes.tooltipLine} /> 
      </div>
    }>
      {children}
    </Tooltip>
  );
}

export default function MultiSlider() {
  const classes = useStyles();

  const [value, setValue] = React.useState(20); // Set initial range values

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        slots={{
          valueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={[0]} // Set default range values
      />
    </div>
  );
}
