import { useRef, useState, useEffect } from 'react';
import { useWavesurfer } from '@wavesurfer/react'

const AudioWave = ({audioUrl}) => {
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);

  if(audioUrl){
    const createdAudio = new Audio();
    createdAudio.src = URL.createObjectURL(audioUrl);
    console.log("audioUrl in audio play is:",createdAudio);
  }


  useEffect(() => {
    if (audioUrl instanceof Blob) {
      setAudioBlobUrl(URL.createObjectURL(audioUrl));
    }
    return () => {
      // Revoke the object URL when the component unmounts or when audioBlobUrl changes
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, [audioUrl]);


  const containerRef = useRef()
  

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioBlobUrl || './audio.mp3',
    waveColor: 'grey',
    progressColor: 'black',
    height: 100,
    barGap: 2,
    barWidth: 4,
    barRadius: 8,
    cursorColor: 'transparent',
    dragToSeek: true,
  })

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(audioUrl);
      link.download = 'audio.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
    <div>
      <div ref={containerRef} />
      <audio>
        {audioUrl && <source src={URL.createObjectURL(audioUrl)} type="audio/mp3" />}
      </audio>
      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {audioUrl && (
          <button onClick={downloadAudio} style={{ minWidth: '5em' }}>
            Download
          </button>
        )}
      </div>
    </div>
  )
}
export default AudioWave;