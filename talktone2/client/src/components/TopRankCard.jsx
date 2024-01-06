import { Box, Text, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import theme from "..";

function TopRankcard() {
  const totalRatings1 = 4.5; // Total ratings out of 5 for the first box
  const weeklyRatings1 = 3.5; // Weekly ratings out of 5 for the first box

  const totalRatings2 = 3.8; // Total ratings out of 5 for the second box
  const weeklyRatings2 = 4.2; // Weekly ratings out of 5 for the second box

  const renderRatingStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round the rating to the nearest 0.5
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <HStack spacing={1} justifyContent="center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} color="yellow" />
        ))}
        {hasHalfStar && <FaStar half color="yellow" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={index} color="gray" />
        ))}
      </HStack>
    );
  };

  return (
    <>
      {/* First */}
      <Box display="flex" m={10}>
        <Box flex="1" ml={20} mr={15} className="textBox">
          <Box
            textColor="white"
            bg="#2C3333"
            border="2px"
            borderRadius="10px"
            p={6}
            textAlign="center"
            style={{ fontFamily: theme.fonts.main }}
            maxH="fit-content" // Set maxH to fit-content to adjust the height dynamically based on content
            maxW="400px" // Reduce the max width of the box as desired
            ml="20%" //
            mt="10%"
          >
            <Text fontSize="20px" fontWeight="bold" mb={4}>
              OPERATOR_1
            </Text>
            <Text fontSize="16px" mb={2}>
              Operator's ID: 101
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Calls Received: 10
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Calls Made: 15
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Ratings: {renderRatingStars(totalRatings1)}
            </Text>
            <Text fontSize="16px" mb={2}>
              Weekly Ratings: {renderRatingStars(weeklyRatings1)}
            </Text>
          </Box>
        </Box>
        <Box
          flex="1"
          position="relative"
          backgroundImage="url('../images/Women.jpg')"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          fontSize="24px"
          fontWeight="bold"
          height="400px" // Adjust the height as desired
          maxWidth="600px"
          mr={20}
          borderRadius="10px"
          _hover={{
            "& > div.overlay": {
              opacity: 0.4,
            },
            "& > div.text": {
              opacity: 0,
            },
          }}
        >
          <Box
            className="overlay"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.9)"
            transition="opacity 0.3s ease"
            borderRadius="10px"
          ></Box>
          <Box
            className="text"
            zIndex={1}
            style={{ fontFamily: theme.fonts.main }}
          >
            Top Rated Operator
          </Box>
        </Box>
      </Box>

      {/* Second */}
      <Box display="flex" m={10}>
        <Box
          flex="1"
          position="relative"
          backgroundImage="url('../images/man.jpg')"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          fontSize="24px"
          fontWeight="bold"
          height="400px" // Adjust the height as desired
          maxWidth="600px" // Adjust the maxWidth as desired
          ml={20}
          mr={13}
          borderRadius="10px"
          _hover={{
            "& > div.overlay": {
              opacity: 0.3,
            },
            "& > div.text": {
              opacity: 0,
            },
          }}
        >
          <Box
            className="overlay"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.9)"
            transition="opacity 0.3s ease"
            borderRadius="10px"
          ></Box>
          <Box
            className="text"
            zIndex={1}
            style={{ fontFamily: theme.fonts.main }}
          >
            Top Rated Operator
          </Box>
        </Box>
        <Box flex="1" mr={20} className="textBox">
          <Box
            textColor="white"
            bg="#2C3333"
            textAlign="center"
            p={6}
            border="2px"
            borderRadius="10px"
            maxH="fit-content" // Set maxH to fit-content to adjust the height dynamically based on content
            maxW="400px" // Reduce the max width of the box as desired
            ml="20%" //
            mt="10%" // Center the box horizontally
            style={{ fontFamily: theme.fonts.main }}
          >
            <Text fontSize="20px" fontWeight="bold" mb={4}>
              OPERATOR_2
            </Text>
            <Text fontSize="16px" mb={2}>
              Operator's ID: 101
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Calls Received: 20
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Calls Made: 25
            </Text>
            <Text fontSize="16px" mb={2}>
              Total Ratings: {renderRatingStars(totalRatings2)}
            </Text>
            <Text fontSize="16px" mb={2}>
              Weekly Ratings: {renderRatingStars(weeklyRatings2)}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TopRankcard;
