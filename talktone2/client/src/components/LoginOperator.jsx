import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

function Login() {
  const [user, setUser] = useState({
    cnic: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cnic, password } = user;

    if (!cnic || !password) {
      setErrorMessage("Please enter all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/operator/loginOperator", user);
      if (response.data.success) {
        localStorage.setItem('userOp',cnic)
        navigate("/OperatorDashboard");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <Flex
      minH="100vh"
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
        <Heading
          as="h1"
          fontWeight="bold"
          color="white"
          lineHeight="1.2"
          fontSize={{ base: "20px", sm: "24px", md: "28px", lg: "32px", xl: "36px" }} // Adjust as needed
        >
          Welcome Operator
        </Heading>

        <Text color="gray.300">
          Please Enter your credentials to login
        </Text>
        {errorMessage && (
          <Text color="red.400">{errorMessage}</Text>
        )}
        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <FormControl id="cnic" isRequired>
            <FormLabel color="gray.100">CNIC</FormLabel>
            <Input
              type="text"
              placeholder="Enter your CNIC"
              name="cnic"
              onChange={handleChange}
              color="white"
              bg="gray.600"
              borderColor="gray.500"
              _hover={{ borderColor: "gray.400" }}
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel color="gray.100">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              color="white"
              bg="gray.600"
              borderColor="gray.500"
              _hover={{ borderColor: "gray.400" }}
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
