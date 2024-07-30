import React, {useState, useEffect} from 'react';
import './App.css';
import TimePicker from "./components/TimeSelector";
import AudioWave from './components/AudioWave';
import audio from "./audio.mp3";
import Recorder from './components/Recorder';
import MultipleImages from "./components/MultipleImages";

export default function App() {
  const [selectedTime, setSelectedTime] = useState("10:00 am");
  const [playing, setPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);

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

  const toggle = () => setPlaying(!playing);

  // const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
  const [sound] = useState(new Audio(audio)); 
  console.log(sound);

  useEffect(() => {
    playing ? sound.play() : sound.pause();
  },
  [playing]
);
  const handleRecordingOnChange = (audio)=>{
    console.log("Parent incoming recording is:",audio);
    setRecordedAudio(audio);
  }
  const photos = [
    {
      src: 'http://example.com/example/img1.jpg',
      width: 4,
      height: 3
    },
    {
      src: 'http://example.com/example/img2.jpg',
      width: 1,
      height: 1
    }
  ];
   

  return (
    <div>
        {/* {recordedAudio ?
        :
      } */}
      <MultipleImages />
      {recordedAudio ?
        <AudioWave audioUrl={recordedAudio}  />
        :
        <Recorder audioUrl={recordedAudio} audio={recordedAudio} onChange={handleRecordingOnChange} />
        }
        {/* <AudioPlayer /> */}
        {/* <AudioRecorder /> */}
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
         <div>
          <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
        <div style={{background:"lightblue", minHeight:'30px', minWidth: '60px'}}>
        <audio controls>
          <source src={audio} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio> 
        </div>
    </div>
  )
}
