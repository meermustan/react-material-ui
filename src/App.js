import React from 'react';
import './App.css';
import TimePicker from "./components/TimeSelector";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: "10:00 am", // Example initial value for selectedTime
    };
  }

  handleTabClick = (index) => {
    console.log(`Tab ${index + 1} clicked!`);
  };

  render() {
    const myTabs = [
      { icon: 'home', content: 'home' },
      { icon: 'setting', content: 'setting' },
    ];

    return (
      <div className="App">
        <h2>this is dots</h2>
        <TimePicker 
          pickerWidth={250}
          showMonthSelector={true}
          selectedTime={this.state.selectedTime}
          changeInputTime={inputTime => console.log(inputTime)}
          changeSelectedTime={selectedTime => console.log(selectedTime)}
          openPicker={() => console.log("picker")}
          onOk={(value)=>console.log("here is time okay,",value)}
          closePicker={()=>{}}
        />
        {/* Rest of your components */}
      </div>
    );
  }
}

export default App;
