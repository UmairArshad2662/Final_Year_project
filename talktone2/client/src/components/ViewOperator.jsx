import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  IconButton,
  Container,
  VStack
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { ChatIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';

const ViewOperator = () => {
  const [operators, setOperators] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/viewOperator").then((response) => {
      setOperators(response.data?.operators);
    });
  }, []);

  const handleDelete = async (cnic) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/admin/deleteOperator/${cnic}`);
      if (response.status === 200) {
        setOperators(operators.filter((operator) => operator.cnic !== cnic));
        toast({
          title: "Operator deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: "Error deleting operator",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" p={5} centerContent>
      <VStack spacing={6} w="100%" bg="#2D3748" borderRadius="lg" p={5} align="stretch">
        <Box>
          <Button as={RouterLink} to="/AdminDashboard" colorScheme="blue">
            Go Back
          </Button>
        </Box>
        <Box overflowX="auto" w="100%">
          <Heading as="h2" size="xl" color="white" textAlign="center" mb={6}>
            Operator's List
          </Heading>
          <Table variant="simple" size="md" colorScheme="teal">
            <Thead>
              <Tr>
                <Th color="teal.200">Name</Th>
                <Th color="teal.200">CNIC</Th>
                <Th color="teal.200">Password</Th>
                <Th color="teal.200">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {operators.map((operator) => (
                <Tr key={operator.id}>
                  <Td color="white">{operator?.Profile?.name}</Td>
                  <Td color="white">{operator.cnic}</Td>
                  <Td color="white">{operator.password}</Td>
                  <Td>
                    <IconButton
                      icon={<ViewIcon />}
                      as={RouterLink}
                      to={`/OperatorProfile/${operator.cnic}`}
                      aria-label="View Profile"
                      variant="ghost"
                      colorScheme="teal"
                      mr={2}
                    />
                    <IconButton
                      icon={<ChatIcon />}
                      aria-label="Chat"
                      variant="ghost"
                      colorScheme="teal"
                      // onClick={() => handleChat(operator.cnic)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDelete(operator.cnic)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default ViewOperator;