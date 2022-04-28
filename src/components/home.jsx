import React, { useEffect, useState, useCallback } from 'react';
import {
  useMediaQuery,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  useToast,
  Button,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import EditContact from './editContact';
import MobileHome from './mobileHome';
import CreateContact from './createContact';
import DeleteAlertModal from './deleteAlertModal';
import ViewAContact from './viewAContact';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedContactID, setSelectedContactID] = useState(null);
  const [reload, setReload] = useState(Math.random());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const toast = useToast();

  const [isBigScreen] = useMediaQuery('(min-width: 768px)');

  const getContacts = useCallback(async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      const response = await axios.get(`${baseURL}/contact`);
      const contacts = response.data.data;
      setContacts(contacts);
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      console.error(error);
    }
  }, [toast]);

  useEffect(() => {
    getContacts();
  }, [reload, getContacts]);

  if (isBigScreen) {
    return (
      <Box mx={12} mt={4}>
        <TableContainer>
          <Flex justifyContent="flex-end">
            <Button
              onClick={() => setShowCreateForm(true)}
              w={200}
              isFullWidth={false}
              colorScheme="teal"
            >
              Add a New Contact
            </Button>
          </Flex>
          {contacts.length > 0 && (
            <Table variant="striped" colorScheme="teal">
              <TableCaption placement="top">
                <Text fontSize="3xl">{contacts.length} Contact(s) </Text>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contacts.map(contact => (
                  <Tr key={contact._id}>
                    <Td>{`${contact.firstName}  ${contact.lastName}`}</Td>
                    <Td>{contact.email}</Td>
                    <Td>{contact.phoneNumber}</Td>
                    <Td>
                      <IconButton
                        aria-label="Edit Contact"
                        size="sm"
                        variant="link"
                        icon={
                          <GrEdit
                            onClick={() => {
                              setContact(contact);
                            }}
                          />
                        }
                      />
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        variant="link"
                        aria-label="Delete Contact"
                        icon={
                          <RiDeleteBin6Line
                            onClick={() => {
                              setContactToDelete(contact);
                            }}
                          />
                        }
                      />
                    </Td>
                    <Td>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedContactID(contact._id);
                        }}
                      >
                        Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
        <EditContact
          isOpen={!!contact}
          onClose={() => {
            setContact(null);
            setReload(Math.random());
          }}
          contact={contact}
        />
        <CreateContact
          isOpen={showCreateForm}
          onClose={() => {
            setShowCreateForm(false);
            setReload(Math.random());
          }}
        />
        <DeleteAlertModal
          isOpen={!!contactToDelete}
          onClose={() => {
            setContactToDelete(null);
            setReload(Math.random());
          }}
          contact={contactToDelete}
        />

        {selectedContactID !== null && (
          <ViewAContact
            isOpen={!!selectedContactID}
            onClose={() => {
              setSelectedContactID(null);
            }}
            contactID={selectedContactID}
          />
        )}
      </Box>
    );
  }
  return (
    <MobileHome
      contacts={contacts}
      refresh={() => {
        setReload(Math.random());
      }}
    />
  );
}

export default Home;
