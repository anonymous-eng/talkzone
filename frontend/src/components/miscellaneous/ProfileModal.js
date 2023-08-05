import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bt = useColorModeValue('gray.200', 'blue.500');
  const bg = useColorModeValue('#EDF2F7', '#171923');

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(20px)'
    />
  )

  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <>
      {children ? (
        <span onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}>{children}</span>
      ) : (
        <IconButton bg={bt} display={{ base: "flex" }} icon={<ViewIcon />} onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }} />
      )}
      <Modal bg={bg} size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        {overlay}
        <ModalContent bg={bg} h="410px">
          <ModalHeader
            bg={bg}
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
              fontWeight="bold"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button bg={bt} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
