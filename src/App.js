import logo from './logo.svg';
import './App.css';
import CustomDots from './components/CustomDots';
import SwipeableTabs from './components/SwipeableTabs';
import CircularTabBar from './components/CircularTabs';
import { Button,Checkbox } from '@material-ui/core';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MultiSlider from './components/MultiSlider';
import Calender from './components/Calender';

function App() {

  const handleTabClick = (index) => {
    console.log(`Tab ${index + 1} clicked!`);
  };

  const myTabs = [
    {icon: 'home', content:'home'},
    {icon: 'setting', content:'setting'},
  ]

  return (
    <div className="App">
        <h2>this is dots</h2>
        <Calender />
       <MultiSlider />
       <CustomDots totalDots={4} />
       <SwipeableTabs />
       <CircularTabBar  tabs={myTabs} onTabClick={handleTabClick} />
       {/* <CustomDateTimePicker /> */}
       <Button >Good</Button>
       <Checkbox color="success" ></Checkbox> 
    </div>
  );
}

export default App;
