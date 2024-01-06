import React from "react";
import {
  Table, Thead, Tbody, Tr, Th, Td, Box
} from "@chakra-ui/react";

function Calls(props) {
  const callsData = [props.callReceivedData, props.callMadeData];

  return (
    <Box textAlign="center" p={5} mt={5} borderRadius="lg" boxShadow="md" bg="white">
      <Table variant="simple" size="md" borderWidth="1px" borderColor="gray.300" borderRadius="md">
        <Thead>
          <Tr>
            <Th fontWeight="bold">Call Type</Th>
            <Th fontWeight="bold">Total Calls</Th>
            <Th fontWeight="bold">Duration (minutes)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {callsData.map((call, index) => (
            <Tr key={index}>
              <Td>{call.callType}</Td>
              <Td>{call.totalCalls}</Td>
              <Td>{call.duration}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Calls;
