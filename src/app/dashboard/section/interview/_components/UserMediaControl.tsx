'use client'
import React, { useRef, useState } from 'react';


export default function UerMediaControl() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [micEnabled, setMicEnabled] = useState(true);
    // Function to start the camera and microphone
    const startInterview = async () => {
            setCameraEnabled(true);
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true, // Enable video
                audio: true, // Enable audio
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            setIsStreaming(true);
            // setCameraEnabled(true);
        } catch (err) {
            console.error('Error accessing camera or microphone:', err);
            setError('Could not access camera or microphone. Please allow permissions.');
        }
    };

    // Function to stop the stream
    const stopInterview = () => {
        setCameraEnabled(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();

            // Stop all tracks (video and audio)
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsStreaming(false);
        // setCameraEnabled(false);
    };


    const toggleCamera = () => {
        setCameraEnabled((prev) => !prev);
        // Add logic to disable/enable camera
    };

    const toggleMic = () => {
        setMicEnabled((prev) => !prev);
        // Add logic to disable/enable mic
    };

    return (
        <main className="flex flex-col items-center p-8 space-y-6  text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold ">Mock Interview Preparation</h1>
                <p className="">Get ready for your interview with practice sessions!</p>
            </div>

            <div className="flex space-x-4">
                {isStreaming ? (
                    <button
                        onClick={stopInterview}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    >
                        Stop Interview
                    </button>
                ) : (
                    <button
                        onClick={startInterview}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                    >
                        Start Interview
                    </button>
                )}
            </div>
            <div className="interview-container">
                {/* <h1>Mock Interview Preparation</h1>
                    <div>
                        {isStreaming ? (
                            <button onClick={stopInterview}>Stop Interview</button>
                        ) : (
                            <button onClick={startInterview}>Start Interview</button>
                        )}
                    </div> */}
                {error && <p className="error">{error}</p>}
                {/* Video element to display camera feed */}
                <div
                    className={`w-80 h-60 border-4 rounded-lg shadow-md relative ${cameraEnabled ? "border-blue-500" : "border-gray-300 bg-gray-200"
                        } flex items-center justify-center`}
                >
                    {cameraEnabled ? (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover rounded-lg"
                            autoPlay
                            muted
                        ></video>
                    ) : (
                        <p className="text-gray-500 text-lg">Your camera is off</p>
                    )}
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={toggleCamera}
                    className={`px-6 py-2 rounded-lg shadow-md ${cameraEnabled
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                >
                    {cameraEnabled ? "Disable Camera" : "Enable Camera"}
                </button>

                <button
                    onClick={toggleMic}
                    className={`px-6 py-2 rounded-lg shadow-md ${micEnabled
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                >
                    {micEnabled ? "Disable Microphone" : "Enable Microphone"}
                </button>
            </div>

        </main>
    )
}


