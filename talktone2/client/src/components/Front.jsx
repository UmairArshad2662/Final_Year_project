import React from 'react';
import { Box, Flex, VStack, Button, Text, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Front() {
  return (
    <Box
      position="relative"
      width="100vw"
      height="100vh"
      bgGradient="linear(to-br, teal.800, blue.900)" // Darker gradient background
    >
      {/* Background Image */}
      <Image
        src="/path/to/your/background-image.jpg" // Replace with your background image path
        alt="Background"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        objectFit="cover"
        opacity="0.7" // Darker image overlay
      />

      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        textAlign="center"
      >
        {/* Logo and Title */}
        <VStack spacing={4} mb={10}>
          <Text
            fontSize="6xl"
            fontWeight="bold"
            color="white"
            mb={4}
            fontStyle="italic"
            fontFamily="-moz-initial" // Use your imported font-family
          >
            TalkTone
          </Text>

          <Text fontSize="xl" color="gray.200">Connecting the world with a click</Text>
        </VStack>

        {/* Buttons Grid */}
        <Flex direction="row" spacing={10} mb={10}>
          <Button
            as={RouterLink}
            to="/Login"
            size="lg"
            bg="whiteAlpha.200" // Even more translucent button background
            color="white"
            _hover={{ bg: "whiteAlpha.300" }}
            boxShadow="lg"
            mr={6}
          >
            Login as Admin
          </Button>
          <Button
            as={RouterLink}
            to="/LoginOperator"
            size="lg"
            bg="whiteAlpha.200"
            color="white"
            _hover={{ bg: "whiteAlpha.300" }}
            boxShadow="lg"
          >
            Login as Operator
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Front;
