import React, { useState } from 'react';
import { DatePicker, TimePicker } from 'react-native-date-picker'; // Or "@mui/material"



const CustomDateTimePicker = () =>{
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };

  return (
    <div>
      <div>
      <DatePicker
        modal // For modal-style picker
        open={true} // Or control opening programmatically
        date={selectedDate}
        onDateChange={handleDateChange}
      />
      <TimePicker
        modal // For modal-style picker
        open={true} // Or control opening programmatically
        time={selectedTime}
        onTimeChange={handleTimeChange}
      />
    </div>
    </div>
  );
};

export default CustomDateTimePicker;