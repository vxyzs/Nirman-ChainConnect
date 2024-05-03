import { Input } from "@chakra-ui/input";

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Amount to Support</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>
          <Input placeholder="Enter Amount" />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Support
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
