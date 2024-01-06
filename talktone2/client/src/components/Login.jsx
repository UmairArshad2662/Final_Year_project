import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box
} from "@chakra-ui/react";

function Login() {
  const [user, setUser] = useState({ cnic: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate.replace("/AdminDashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cnic, password } = user;

    if (!cnic || !password) {
      setErrorMessage("Please enter all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/admin/loginAdmin", user);
      if (response.data.success) {
        localStorage.setItem("login", true);
        navigate.replace("/AdminDashboard");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg="gray.800"
    >
      <VStack
        spacing={5}
        p={8}
        borderRadius="md"
        boxShadow="0px 4px 20px 0px rgba(0, 0, 0, 0.1)"
        bg="gray.700"
        width={["90%", "80%", "30%"]}
      >
        <Heading as="h1" size="xl" fontWeight="bold" color="white">
          Welcome Admin
        </Heading>
        {errorMessage && (
          <Box color="red.500" textAlign="center" width="100%">
            {errorMessage}
          </Box>
        )}
        <Box as="form" width="100%" onSubmit={handleSubmit}>
          <FormControl id="cnic" isRequired>
            <FormLabel color="white">CNIC *</FormLabel>
            <Input
              name="cnic"
              type="text"
              placeholder="Enter your CNIC"
              onChange={handleChange}
              color="white"
              bg="gray.600"
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel color="white">Password *</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              color="white"
              bg="gray.600"
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <Button
            mt={6}
            colorScheme="blue"
            width="full"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
}

export default Login;
