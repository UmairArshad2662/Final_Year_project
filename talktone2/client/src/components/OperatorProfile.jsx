import React from 'react';
import { Box, Flex, Text, VStack, Heading, Divider } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import axios from 'axios';
 
const OperatorProfile = () => {
    var [operatorProfile,setOperatorProfile]=useState({})
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:8000/api/profile/fetchOperatorProfile/"+id).then((response) => {
            setOperatorProfile(response.data?.profile);
        });
      }, []);



  return (
    <Flex width="full" align="center" justifyContent="center" p={5}>
      <VStack spacing={4} align="stretch" w="lg" boxShadow="lg" p={5} borderRadius="md" bg="white">
        <Heading as="h2" size="lg">Operator Profile</Heading>
        <Divider />
        <Box>
          <Text fontWeight="semibold">Name:</Text>
          <Text>{operatorProfile.name}</Text>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight="semibold">Address:</Text>
          <Text>{operatorProfile.address}</Text>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight="semibold">Phone Number:</Text>
          <Text>{operatorProfile.phNumber}</Text>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight="semibold">Date of Birth:</Text>
          <Text>{operatorProfile.dob}</Text>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight="semibold">Experience:</Text>
          <Text>{operatorProfile.experience}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export default OperatorProfile;
