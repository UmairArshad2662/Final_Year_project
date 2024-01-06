import React, { useState } from "react";
import axios from "axios";
import {
  Input, Button, Grid, Box, Flex, Heading, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, useToast
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function AddOperator() {
  const [user, setUser] = useState({ name: "", email: "", cnic: "", password: "",address:"",phoneNumber:"",dob:"",experience:"" });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const openModal = () => {
    const fields = Object.keys(user).filter((field) => !user[field]);
    if (fields.length === 0) {
      setShowModal(true);
    } else {
      toast({
        title: 'Required fields missing',
        description: 'Please fill all the fields before submitting.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const registerUser = () => {
    axios.post("http://localhost:8000/api/admin/addOperator", user).then((res) => {
      setMessage(res.data.message);
      closeModal();
    });
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bg="gray.800" // Dark theme background
        color="white" // Text color for dark theme
      >
        <Box width="400px" p="4" bg="gray.700" borderRadius="md" boxShadow="lg">
          <Heading as="h1" size="xl" textAlign="center" mb={6}>Operator's Form</Heading>
          <Grid templateColumns="repeat(1, 1fr)" gap={6} marginBottom={4}>
            {/* Form Inputs */}
            {Object.keys(user).map((key) => (
              <FormControl isRequired key={key}>
                <FormLabel color="gray.400">{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                <Input
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={user[key]}
                  name={key}
                  onChange={handleChange}
                  // borderColor={emptyFields.includes(key) ? "red.500" : "gray.500"}
                  _placeholder={{ color: 'gray.500' }} // Placeholder color for dark theme
                  type={key === "password" ? "password" : "text"}
                  focusBorderColor="blue.500" // Focus color matching the theme
                />
              </FormControl>
            ))}
          </Grid>
          <Flex justifyContent="center" mt={4}>
            <Button colorScheme="blue" onClick={openModal} mr={3}>Submit</Button>
            <Button as={RouterLink} to="/AdminDashboard" colorScheme="red">Return</Button>
          </Flex>
        </Box>
      </Flex>

      {/* Confirmation Modal */}
      <Modal isOpen={showModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.700" color="white">
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to add this user?</ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={registerUser}>Yes</Button>
            <Button colorScheme="red" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Feedback Modal */}
      {message && (
        <Modal isOpen={Boolean(message)} onClose={() => setMessage("")} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.700" color="white">
            <ModalHeader>User Creation Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setMessage("")}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default AddOperator;
