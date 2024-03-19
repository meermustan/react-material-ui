import React, {useState} from 'react';
import './App.css';
import TimePicker from "./components/TimeSelector";


export default function App() {
  const [selectedTime, setSelectedTime] = useState("10:00 am");

  const handleTimeInput = (inputTime) => {
    console.log("Input Time:", inputTime);
  };

  const handleTimeSelection = (selectedTime) => {
    console.log("Selected Time:", selectedTime);
  };

  const handleTimePickerClose = () => {
    // Handle closing of the time picker if needed
  };

  const handleTimePickerOpen = () => {
    // Handle opening of the time picker if needed
  };

  const handleTimePickerOk = (value) => {
    console.log("Time Picker Value:", value);
    // You can perform additional actions here after the user selects a time
  };


  return (
    <div>

        <TimePicker 
          pickerWidth={250}
          showMonthSelector={true}
          selectedTime={selectedTime}
          changeInputTime={handleTimeInput}
          changeSelectedTime={handleTimeSelection}
          openPicker={handleTimePickerOpen}
          onOk={handleTimePickerOk}
          closePicker={handleTimePickerClose}
        />
    </div>
  )
}
