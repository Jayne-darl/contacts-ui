import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function CustomForm({ id, contact: selectedContact, onSubmit }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          type="text"
          onChange={e =>
            setContact(value => ({ ...value, firstName: e.target.value }))
          }
          value={contact.firstName}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          type="text"
          onChange={e =>
            setContact(value => ({ ...value, lastName: e.target.value }))
          }
          value={contact.lastName}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={e =>
            setContact(value => ({ ...value, email: e.target.value }))
          }
          value={contact.email}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
        <Input
          id="phoneNumber"
          type="phone"
          onChange={e =>
            setContact(value => ({ ...value, phoneNumber: e.target.value }))
          }
          value={contact.phoneNumber}
        />
      </FormControl>
    </form>
  );
}

export default CustomForm;
