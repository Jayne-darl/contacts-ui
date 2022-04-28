import React, { useState, useEffect } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function DeleteAlertModal(props) {
  const [contact, setContact] = useState({});
  const cancelRef = React.useRef();
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (props.contact) {
      setContact(props.contact);
    }
  }, [props]);
  const deleteContact = async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setDeleting(true);
      await axios.delete(`${baseURL}/contact/${contact._id}`);
      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact successfully deleted.',
        position: 'top',
      });
      setDeleting(false);
      props.onClose();
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      console.log(error.response?.data?.message || error.message);
      setDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Contact
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={deleting}
                onClick={() => {
                  deleteContact();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteAlertModal;
