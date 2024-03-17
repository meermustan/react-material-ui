import React, { useState } from 'react';
// import { AudioRecorder } from 'react-audio-voice-recorder';
// import { VoiceRecorder } from 'react-voice-recorder-player';
import {Recorder} from 'react-voice-recorder';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';


export default function AudioPlayer() {

  const [audioDetails, setAudioDetails] = useState({
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
  });
  const [blob, setBlob] = useState();
  const recorder = useAudioRecorder();
    // const styles = {
    //     mainContainerStyle: {
    //       backgroundColor: 'gray',
    //       border: '1px solid black',
    //       borderRadius: '5px',
    //       padding: '10px',
    //       display: 'flex',
    //     },
    //     controllerContainerStyle: {
    //       // display: 'none',
    //       justifyContent: 'space-between',
    //       marginTop: '10px'
    //     },
    //     controllerStyle: {
    //       backgroundColor: 'white',
    //       border: '1px solid black',
    //       borderRadius: '5px',
    //       cursor: 'pointer',
    //       padding: '5px'
    //     },
    //     waveContainerStyle: {
    //       height: '100px',
    //       marginTop: '10px',
    //       width: '100%'
    //     }
    //   };

    function handleAudioStop(data){
      console.log(data)
      setAudioDetails({audioDetails: data})
    }
    
    function handleAudioUpload(file) {
        console.log(file);
    }
    
    function handleCountDown(data) {
        console.log(data);
    }
  
    function handleReset() {
      const reset = {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      };
      setAudioDetails({reset});
    }
      
    console.log(recorder);
  return (
    <div>
        <AudioRecorder 
            // onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
            }} 
            onRecordingComplete={setBlob}
            recorderControls={recorder}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
        />

      {recorder.mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={recorder.mediaRecorder}
          width={200}
          height={75}
        />
      )}

      {blob && (
        <AudioVisualizer
          blob={blob}
          width={500}
          height={75}
          barWidth={1}
          gap={0}
          barColor={'#f76565'}
        />
      )}

        {/* <VoiceRecorder 
            mainContainerStyle={styles.mainContainerStyle}
            controllerContainerStyle={styles.controllerContainerStyle}
            controllerStyle={styles.controllerStyle}
            waveContainerStyle={styles.waveContainerStyle}
            download={false}
        /> */}

        {/* <Recorder
            record={true}
            title={"New recording"}
            audioURL={audioDetails.url}
            showUIAudio
            hideHeader
            handleAudioStop={data => handleAudioStop(data)}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleCountDown={data => handleCountDown(data)}
            handleReset={() => handleReset()}
            mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
        /> */}
    </div>
  )
}