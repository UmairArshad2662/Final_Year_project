import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

function Footer() {
  // Function to format the current time and date
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return now.toLocaleString("en-PK", options);
  };

  return (
    <Box
      bg="#23374d" // Adjusted to match the header and sidebar theme
      color="white"
      py={4}
      mt={5} // Added margin top for some spacing from the content above
    >
      <Flex justifyContent="space-around" alignItems="center">
        {/* Logo or Brand Name */}
        <Text fontSize="lg" fontWeight="bold">Talk Tone</Text>

        {/* CopyRight Information */}
        <Text fontSize="lg">© 2023 Talk Tone. All rights reserved</Text>

        {/* Current Date and Time */}
        <Text fontSize="lg">{getCurrentDateTime()}</Text>
      </Flex>
    </Box>
  );
}

export default Footer;
