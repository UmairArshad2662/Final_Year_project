import React, { useState, useCallback } from "react";
import { Box, Flex, Button, Input } from "@chakra-ui/react";
import Footer from "./Footer";
import PhoneDialer from "./Dialer";
import Header from "./Header";
import Calls from "./Calls";

import { useNavigate } from "react-router-dom";
function OperatorDashboard() {
  const [callMadeData, setCallMadeData] = useState({ callType: "Calls Received", totalCalls: 50, duration: 120 });
  const [callReceivedData, setCallReceivedData] = useState({ callType: "Calls Made", totalCalls: 30, duration: 75 });
  // 
  const [value, setValue] = useState();
  let navigate = useNavigate();
  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`)
  }, [navigate, value])
  // 
  // ... (existing code)

  const handleAudioFileChange = (event) => {
    setaudioFile(event.target.files[0]);
  };
  const [audioFile, setaudioFile] = useState()
  const [response, setResponseFromServer] = useState()
  const handleUploadAudio = () => {
    // Check if an audio file is selected
    if (!audioFile) {
      console.error("No audio file selected.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();

    // Append the audio file to the FormData object
    formData.append("file", audioFile);

    // Send the FormData object in the request
    fetch("http://localhost:5000/predict_emotion", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the server response
        console.log("Server Response:", data);

        // Save the response in state
        setResponseFromServer(data);
      })
      .catch((error) => {
        console.log("Error uploading audio file:", error);

        // Handle the error as needed
      });
  };


  return (
    <>
      <Box bg="rgba(0, 0, 0, 0.4)" height="100%" backdropFilter="blur(2px)">
        <Header />
      </Box>

      <Flex justify="center" p={5}>
        <Box p={5} boxShadow="md" borderRadius="lg" bg="white" mr={5}>
          <PhoneDialer callMadeData={callMadeData} setCallMadeData={setCallMadeData} callReceivedData={callReceivedData} setCallReceivedData={setCallReceivedData} />
        </Box>
        <Box p={5} boxShadow="md" borderRadius="lg" bg="white">
          <Calls callMadeData={callMadeData} setCallMadeData={setCallMadeData} callReceivedData={callReceivedData} setCallReceivedData={setCallReceivedData} />
        </Box>
        <Box><div>
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter Room code" />
          <Button onClick={handleJoinRoom}>Join Room</Button>
        </div> </Box>
      </Flex>
      <Input type="file" mt={2} onChange={handleAudioFileChange} accept="audio/*" />

      <Button colorScheme="teal" mt={2} onClick={handleUploadAudio}>
        Upload Text File
      </Button>
      <Footer />

    </>
  );
}

export default OperatorDashboard;


