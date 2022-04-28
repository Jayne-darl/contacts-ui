import React, { useState, useEffect, useCallback } from 'react';
import { useToast, Box, Text, Skeleton, Flex, Divider } from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from './customModal';

function ViewAContact(props) {
  const [contact, setContact] = useState({});
  const [edits, setEdits] = useState([]);
  const [fetching, setFetching] = useState(false);

  const toast = useToast();

  const getContact = useCallback(async () => {
    try {
      setFetching(true);
      const baseURL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseURL}/contact/${props.contactID}`);
      const selectedContact = response.data.data.contact;
      const editHistory = response.data.data.editHistory;

      setContact(selectedContact);
      setEdits(editHistory);
      setFetching(false);
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      setFetching(false);
      console.error(error);
    }
  }, [props.contactID, toast]);

  useEffect(() => {
    getContact();
  }, [getContact]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <CustomModal
      title="Contact Details"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Skeleton size="20" isLoaded={!fetching}>
        <Box fontSize="sm">
          <Box
            shadow="md"
            w="100%"
            textAlign="left"
            pl="5"
            py="3"
            borderWidth="1px"
          >
            <Flex gap="2">
              <Text fontWeight="semibold">Name:</Text>
              <Text>{`${contact.firstName}  ${contact.lastName}`}</Text>
            </Flex>
            <Flex gap="2">
              <Text fontWeight="semibold">Email:</Text>
              <Text>{contact.email}</Text>
            </Flex>
            <Flex gap="2">
              <Text fontWeight="semibold">Phone:</Text>
              <Text>{contact.phoneNumber}</Text>
            </Flex>
            <Divider />
            <Flex gap="2" pt="3">
              <Text fontWeight="semibold">Created At:</Text>
              <Text>{formatDate(contact.createdAt)}</Text>
            </Flex>
          </Box>
          {edits.length > 0 && (
            <>
              <Text
                pt="5"
                pb="3"
                align="center"
                fontWeight="bold"
                fontSize="md"
              >
                Edit History
              </Text>
              {edits.map(edit => {
                const createdAt = formatDate(edit.createdAt);
                return (
                  <Box
                    shadow="md"
                    w="100%"
                    textAlign="left"
                    pl="5"
                    py="3"
                    mb="1"
                    borderWidth="1px"
                    key={edit._id}
                  >
                    <Text>{`${edit?.firstName}  ${edit?.lastName}`}</Text>
                    <Text>{edit.email}</Text>
                    <Text>{edit.phoneNumber}</Text>
                    <Divider />
                    <Flex gap="2" pt="3">
                      <Text fontWeight="semibold">Edited At:</Text>
                      <Text>{createdAt}</Text>
                    </Flex>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Skeleton>
    </CustomModal>
  );
}

export default ViewAContact;
