import React, { useState } from 'react';
import {
  Box, Button, Grid, Text, Input, VStack, useToast
} from "@chakra-ui/react";

const PhoneDialer = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const toast = useToast();

  const handleKeyPress = (digit) => {
    setPhoneNumber((prevNumber) => prevNumber + digit);
  };

  const handleBackspace = () => {
    setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'Recording ended' : 'Recording started',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    if (isRecording) {
      props.setCallMadeData({
        ...props.callMadeData, totalCalls: props.callMadeData.totalCalls + 1
      });
    }
  };

  return (
    <VStack bg="white" p={5} borderRadius="lg" boxShadow="md" spacing={4} border="2px solid" borderColor="blue.500">
      <Text fontSize="2xl" fontWeight="bold">Phone Dialer</Text>
      <Input
        value={phoneNumber}
        readOnly
        variant="filled"
        placeholder="Enter phone number"
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {'123456789'.split('').map((digit) => (
          <Button key={digit} onClick={() => handleKeyPress(digit)}>{digit}</Button>
        ))}
        
        <Button onClick={() => handleKeyPress('0')} >0</Button>
        <Button onClick={handleBackspace} >&lt;</Button>
      </Grid>
      <Button
        colorScheme={isRecording ? "red" : "green"}
        onClick={handleRecording}
        size="lg"
      >
        {isRecording ? 'End Call' : 'Start Call'}
      </Button>
    </VStack>
  );
};

export default PhoneDialer;
