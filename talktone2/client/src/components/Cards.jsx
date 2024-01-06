import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import Cards from "./Cards"; // Import the Cards component

function AdminDashboard() {
  useEffect (()=>{
    fetch("http://localhost:8000/api/admin/operatorCount")
    .then(res => res.json())
    .then(data => { setCount(data.count); })
  },[]);

  const [count, setCount] = useState(0);

  return (
    <>
      {/* Header Section */}
      <Header />

      <Flex>
        {/* Sidebar Section */}
        <Box width="20%">
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box width="80%" p={4}>
          {/* Cards Component */}
          <Cards />

          {/* Dashboard Statistics */}
          <Flex justifyContent="space-between" mt={10}>
            {/* Total Calls Received */}
            <Box textAlign="center" borderRadius="md" bg="#395B64" color="white" p={4} boxShadow="sm">
              <Text fontWeight="bold">Total Calls Received</Text>
              <Text fontSize="2xl">101</Text>
            </Box>
            {/* Total Calls Made */}
            <Box textAlign="center" borderRadius="md" bg="#395B64" color="white" p={4} boxShadow="sm">
              <Text fontWeight="bold">Total Calls Made</Text>
              <Text fontSize="2xl">160</Text>
            </Box>
            {/* Total Operators */}
            <Box textAlign="center" borderRadius="md" bg="#395B64" color="white" p={4} boxShadow="sm">
              <Text fontWeight="bold">Total Operators</Text>
              <Text fontSize="2xl">{count}</Text>
            </Box>
          </Flex>

          {/* Chart Section */}
          <Flex justifyContent="center" alignItems="center" mt={10}>
            <Image src="../images/chart.jpeg" alt="Chart Image" boxSize="35%" />
          </Flex>

          {/* Other Components */}
          {/* Add any additional components that need to be displayed here */}
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default AdminDashboard;
