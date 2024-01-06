import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Button,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
function AdminDashboard() {
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/operatorCount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      });
  }, []);

  const [opt, setOpt] = useState("");
  const [count, setCount] = useState(0);
  const [audioFile, setaudioFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState(null);
  const [result, setResult] = useState("");
  const [emotion, setEmotion] = useState("");
  const [sentiment, setSentiments] = useState("");
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const handleFileChange = (event) => {
    setaudioFile(event.target.files[0]);
  };

  const handlePredictClick = async () => {
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      let result = "";
      let ratings = [];

      const url =
        "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "e57a64ec5emshf6d8d52819ff342p1835bfjsn91595ee35c54",
          "X-RapidAPI-Host": "twinword-emotion-analysis-v1.p.rapidapi.com",
        },
        body: new URLSearchParams({
          text: data,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const resultObject = JSON.parse(result);
        console.log(resultObject);
        const detectedEmotions = resultObject.emotions_detected;
        console.log(detectedEmotions);
        setEmotion(detectedEmotions[0]);
      } catch (error) {
        console.error(error);
      }

      // console.log("Predict response:", data);
      // console.log("Result:", result);
      // console.log("Ratings:", ratings);

      // setResult(result);
      // setRatings(ratings);

      // // Calculate average rating
      // const avgRating =
      //   ratings.length > 0
      //     ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      //     : 0;
      // setAverageRating(avgRating);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const SentimentsDetection = async () => {
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      let result = "";
      let ratings = [];

      const textToAnalyze = data;
      const encodedText = encodeURIComponent(textToAnalyze);

      // Update the URL to include the encoded text
      const url = ` https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=${encodedText}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e57a64ec5emshf6d8d52819ff342p1835bfjsn91595ee35c54",
          "X-RapidAPI-Host": "twinword-sentiment-analysis.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const resultObject = JSON.parse(result);
        console.log(resultObject);

        const emotionType = resultObject.type;
        console.log(emotionType);
        setSentiments(emotionType);
      } catch (error) {
        console.error(error);
      }
      // console.log("Predict response:", data);
      // console.log("Result:", result);
      // console.log("Ratings:", ratings);

      // setResult(result);
      // setRatings(ratings);

      // // Calculate average rating
      // const avgRating =
      //   ratings.length > 0
      //     ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      //     : 0;
      // setAverageRating(avgRating);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />

      <Flex>
        <Box width="20%">
          <Sidebar />
        </Box>

        <Box width="80%">
          <Flex justifyContent="center" mt={10}>
            <Box
              p="4"
              mx="2"
              textAlign="center"
              borderRadius="md"
              width="200px"
              height="150px"
              bg="#395B64"
              color="white"
              boxShadow="0.5px 0.5px 0.5px"
            >
              <Text fontWeight="bold">Total Calls Received</Text>
              <Text fontSize={20}>101</Text>
            </Box>
            <Box
              p="4"
              mx="2"
              textAlign="center"
              borderRadius="md"
              width="200px"
              height="150px"
              bg="#395B64"
              color="white"
              boxShadow="0.5px 0.5px 0.5px"
            >
              <Text fontWeight="bold">Total Calls Made</Text>
              <Text fontSize={20}>160</Text>
            </Box>
            <Box
              p="4"
              mx="2"
              textAlign="center"
              borderRadius="md"
              width="200px"
              height="150px"
              bg="#395B64"
              color="white"
              boxShadow="0.5px 0.5px 0.5px"
            >
              <Text fontWeight="bold">Total Operators</Text>
              <Text fontSize={20}>{count}</Text>
            </Box>
          </Flex>
          {/* Button_1 */}
          <Box mt={5} mx="auto" width="50%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
            </InputGroup>
            <Text fontWeight="bold" mt={2}>
              Upload Audio File to Predict Emotions
            </Text>
            <Input
              type="file"
              mt={2}
              onChange={handleFileChange}
              accept="audio/*"
            />

            <Button colorScheme="teal" mt={2} onClick={handlePredictClick}>
              Upload
            </Button>
          </Box>
          {/* Button-2 */}
          <Box mt={5} mx="auto" width="50%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
            </InputGroup>
            <Text fontWeight="bold" mt={2}>
              Upload Audio File to Predict Sentiments
            </Text>
            <Input
              type="file"
              mt={2}
              onChange={handleFileChange}
              accept="audio/*"
            />

            <Button colorScheme="teal" mt={2} onClick={SentimentsDetection}>
              Upload
            </Button>
          </Box>
        </Box>
      </Flex>

      {sentiment && (
        <Box mt={5} mx="auto" width="50%">
          {/* Display Result from Server */}
          <Text fontWeight="bold">Result from Server:</Text>
          <Text>{sentiment}</Text>

          {/* Display Ratings using Star Icons */}
          <Text fontWeight="bold" mt={2}>
            Ratings:
          </Text>
          <Flex>
            {ratings.map((rating, index) => (
              <Box key={index} color="teal.500" as="span" fontSize="xl" mr={1}>
                <StarIcon />
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {emotion && (
        <Box mt={5} mx="auto" width="50%">
          {/* Display Result from Server */}
          <Text fontWeight="bold">Result from Server:</Text>
          <Text>{emotion}</Text>

          {/* Display Ratings using Star Icons */}
          <Text fontWeight="bold" mt={2}>
            Ratings:
          </Text>
          <Flex>
            {ratings.map((rating, index) => (
              <Box key={index} color="teal.500" as="span" fontSize="xl" mr={1}>
                <StarIcon />
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {averageRating !== null && (
        <Box mt={5} mx="auto" width="50%">
          {/* Display Average Ratings using Star Icons */}
          <Text fontWeight="bold">Average Ratings:</Text>
          <Flex>
            {[...Array(Math.round(averageRating))].map((_, index) => (
              <Box key={index} color="teal.500" as="span" fontSize="xl" mr={1}>
                <StarIcon />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
      <Footer />
    </>
  );
}

export default AdminDashboard;
