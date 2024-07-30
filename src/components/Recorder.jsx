import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';

const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':');

const Recorder = ({ onChange }) => {
  const containerRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordPlugin, setRecordPlugin] = useState(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  
  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    waveColor: 'grey',
    progressColor: 'black',
    height: 100,
    barGap: 2,
    barWidth: 4,
    barRadius: 8,
    cursorColor: 'transparent',
    url: audioBlobUrl, // No initial URL
    plugins: useMemo(() => [], []),
  });

  const startRecord = () => {
    if (recordPlugin && !isRecording) {
      recordPlugin.startRecording();
      setIsRecording(true);
    }
  };

  const stopRecord = () => {
    if (recordPlugin && isRecording) {
      recordPlugin.stopRecording();
      recordPlugin.on('record-end',(blob)=>{
        setAudioFile(blob);
      })
      setIsRecording(false);
    }
  };


  useEffect(() => {
    if (audioFile instanceof Blob) {
      setAudioBlobUrl(URL.createObjectURL(audioFile));
    }
    return () => {
      // Revoke the object URL when the component unmounts or when audioBlobUrl changes
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [audioFile,]);


  useEffect(() => {
    if (audioFile) {
      onChange(audioFile);
    }
  }, [audioFile, onChange]);

  useEffect(() => {
    // Load audio file when Wavesurfer instance is ready
    if (isReady && audioFile) {
      wavesurfer.load(URL.createObjectURL(audioFile))
        .catch(error => {
          console.error('Error loading audio:', error);
          // Handle error, maybe display a message to the user
        });
    }
  }, [isReady, audioFile, wavesurfer]);

  useEffect(() => {
    if (wavesurfer) {
      const plugin = RecordPlugin.create({ scrollingWaveform: true, renderRecordedAudio: false });
      wavesurfer.registerPlugin(plugin);
      setRecordPlugin(plugin);
    }
  }, [wavesurfer]);

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause().catch((onfinally)=>console.log("g kon?", onfinally))
  }
  
  

  return (
    <>
      <div ref={containerRef} />

      <p>Current time: {formatTime(currentTime)}</p>

      <audio controls>
        {audioFile && <source src={URL.createObjectURL(audioFile)} type="audio/wav" />}
      </audio>

      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button onClick={startRecord} style={{ minWidth: '5em' }}>
          {isRecording ? 'Stop record' : 'Start record'}
        </button>
        <button onClick={stopRecord} style={{ minWidth: '5em' }} disabled={!isRecording}>
          Stop
        </button>
        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  );
};

export default Recorder;
