import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const Recorder = () => {
  return (
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording} disabled={status === "recording"}>
            Start Recording
          </button>
          <button onClick={stopRecording} disabled={status !== "recording"}>
            Stop Recording
          </button>
          {status === "stopped" && mediaBlobUrl && (
            <audio src={mediaBlobUrl} controls />
          )}
        </div>
      )}
    />
  );
};

export default Recorder;
