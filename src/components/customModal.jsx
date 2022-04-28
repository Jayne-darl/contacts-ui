import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useMediaQuery,
} from '@chakra-ui/react';

function CustomModal(props) {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  return (
    <Modal
      size={isMobile ? 'full' : 'md'}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>{props.footerChildren}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
