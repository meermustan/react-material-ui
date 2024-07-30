import React,{useRef, useMemo, useState, useEffect} from 'react';
import { useWavesurfer } from '@wavesurfer/react'
import Recoder from 'wavesurfer.js/dist/plugins/record';
import WaveSurfer from 'wavesurfer.js';
import RecordButton from './RecordButton';
import PlayButton from "./PlayButton";
import DownloadButton from "./DownloadButton";

export default function AudioRecorder() {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const mediaRecorder = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isFinish, setIsFinish] = useState(true);
    const [recordedBlob, setRecordedBlob] = useState(null);

    // const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    //     container: containerRef,
    //     height: 100,
    //     waveColor: 'rgb(200, 0, 200)',
    //     progressColor: 'rgb(100, 0, 100)',
    //     url: audioUrls[urlIndex],
    //     plugins: useMemo(() => [Microphone.create()], []),
    // })
    const initializeWaveSurferWithMicrophone = () => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                height: 200,
                responsive: true,
                plugins: [Recoder.create({})],
                // progressColor: '#4a74a5',
                // waveColor: '#ccc',
                // cursorColor: '#4a74a5',
            });
            // Ensure microphone plugin is initialized before using it
            wavesurfer.current.on('ready', () => {
                if (wavesurfer.current.microphone) {
                    wavesurfer.current.microphone.start();
                }
            });
        }
    };
    
    const startRecording = () => {
        setIsRecording(true);
        setRecordedBlob(new Blob([]));
        if (waveformRef.current) {
            waveformRef.current.innerHTML = '';
        }
        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then((stream) => {
                mediaRecorder.current = new MediaRecorder(stream);
                const chunks = [];

                mediaRecorder.current.addEventListener('dataavailable', (event) => {
                    chunks.push(event.data);
                });

                mediaRecorder.current.addEventListener('stop', () => {
                    const recordedBlobUpdate = new Blob(chunks, {type: 'audio/wav'});
                    setRecordedBlob(recordedBlobUpdate);
                });

                mediaRecorder.current.start();
                initializeWaveSurferWithMicrophone();
                if (wavesurfer.current) {
                    wavesurfer.current?.microphone.start();
                }
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorder.current?.stop();
        wavesurfer.current?.microphone.stop();
    };

    useEffect(() => {
        if (wavesurfer.current && recordedBlob) {
            const audioUrl = URL.createObjectURL(recordedBlob);
            wavesurfer.current.load(audioUrl);
        }
    }, [recordedBlob]);

    const playRecording = () => {
        if (recordedBlob && wavesurfer.current) {
            const audioUrl = URL.createObjectURL(recordedBlob);
            wavesurfer.current.load(audioUrl);
            wavesurfer.current.on('ready', () => {
                setIsFinish(false);
                wavesurfer.current?.play();
            });
            wavesurfer.current.on('finish', () => {
                setIsFinish(true);
            });
        }
    };

    const StopPlayRecording = () => {
        if (recordedBlob && wavesurfer.current) {
            const audioUrl = URL.createObjectURL(recordedBlob);
            wavesurfer.current.load(audioUrl);
            wavesurfer.current.on('ready', () => {
                wavesurfer.current?.stop();
            });
        }
    };

    const downloadRecording = () => {
        if (recordedBlob) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(recordedBlob);
            downloadLink.download = 'recorded_audio.wav';
            downloadLink.click();
        }
    };


  return (
    <div>
        <div style={{
                height: '200px',
                borderRadius: '20px',
                border: 'solid 5px gray',
                backgroundColor: 'black',
            }} ref={waveformRef}/>
        <RecordButton
            id='recordButton'
            onClick={isRecording ? stopRecording : startRecording}
        />
        <PlayButton
                id='playButton'
                onClick={playRecording}
                isFinish={isFinish}
                disabled={isRecording || !recordedBlob}
                StopPlayRecording={StopPlayRecording}
            />
            <DownloadButton
                id='dowload'
                disabled={isRecording || !recordedBlob}
                downloadRecording={downloadRecording}
            />
    </div>
  )
}
