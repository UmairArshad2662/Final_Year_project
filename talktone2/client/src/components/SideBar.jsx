import React from "react";
import { Box, VStack, Icon, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SettingsIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { FaTachometerAlt, FaTable, FaUser, FaBell, FaList, FaCog } from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user'); localStorage.removeItem('userOp'); // Remove the user data from local storage
    localStorage.removeItem('login');
    navigate('/login'); // Redirect to the login page
  };

  const iconColor = useColorModeValue("white");

  return (
    <Box bg="#23374d" w="200px" color={iconColor} minHeight="100vh" pt={5}>
      <VStack align="stretch" spacing={8}>
      <Flex as={RouterLink} to="/Userprofile" align="center" px={4} py={2} _hover={{ bg: "gray.700" }} cursor="pointer">
          <Icon as={FaUser} w={5} h={5} mr={2} />
          <Text fontSize="md">User Profile</Text>
        </Flex>
        <Flex as={RouterLink} to="/AddOperator" align="center" px={4} py={2} _hover={{ bg: "gray.700" }} cursor="pointer">
          <Icon as={FaTable} w={5} h={5} mr={2} />
          <Text fontSize="md">Add Operator</Text>
        </Flex>
        <Flex as={RouterLink} to="/ViewOperator" align="center" px={4} py={2} _hover={{ bg: "gray.700" }} cursor="pointer">
          <Icon as={FaList} w={5} h={5} mr={2} />
          <Text fontSize="md">Operator List</Text>
        </Flex>
        <Flex as={RouterLink} to="/settings" align="center" px={4} py={2} _hover={{ bg: "gray.700" }} cursor="pointer">
          <Icon as={FaCog} w={5} h={5} mr={2} />
          <Text fontSize="md">Settings</Text>
        </Flex>
        <Flex align="center" px={4} py={2} _hover={{ bg: "gray.700" }} cursor="pointer" onClick={handleLogout}>
          <ArrowForwardIcon w={5} h={5} mr={2} />
          <Text fontSize="md">Logout</Text>
        </Flex>
      </VStack>
    </Box>
  );
}

export default Sidebar;
