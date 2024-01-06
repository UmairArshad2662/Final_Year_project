import React, { useState } from "react";
import {
  Box,
  Text,
  
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

function Bell() {
    const [isNotificationOpen, setNotificationOpen] = useState(false);
  
    const handleNotificationOpen = () => {
      setNotificationOpen(true);
    };
  
    const handleNotificationClose = () => {
      setNotificationOpen(false);
    };
    return(
        <>
{/* Bell Icon */}
<Box maxWidth="full" maxH="full">
<Box position="absolute" top="6px" right="50px" width="50%" h="50%">
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              color="#2C3333"
              position="absolute"
              top="0"
              right="10px"
              fontSize="28px"
              _hover="none"

              onClick={handleNotificationOpen}
            />
          </Box>
          </Box>
          <Modal isOpen={isNotificationOpen} onClose={handleNotificationClose}  >
        <ModalOverlay />
        <ModalContent maxW="500px" style={{ position: "fixed", top: "0%", left: "60%", transform: "translate(-50%, -50%)" }}>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={18}>You don't have any notification yet</Text>
            
          </ModalBody>
        </ModalContent>
      </Modal>
        </>
    )
}
export default Bell;
    