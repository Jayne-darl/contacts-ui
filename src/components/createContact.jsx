import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import CustomModal from './customModal';
import axios from 'axios';
import CustomForm from './customForm';

function CreateContact(props) {
  const [creating, setCreating] = useState(false);
  const toast = useToast();

  const onSubmit = async contact => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setCreating(true);
      await axios.post(`${baseURL}/contact`, contact);
      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact successfully created.',
        position: 'top',
      });
      setCreating(false);
      props.onClose();
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      console.log(error.response?.data?.message || error.message);
      setCreating(false);
    }
  };

  return (
    <CustomModal
      title="Create Contact"
      isOpen={props.isOpen}
      onClose={props.onClose}
      footerChildren={
        <Button
          type="submit"
          size="md"
          form="create-form"
          isLoading={creating}
          colorScheme="teal"
        >
          Submit
        </Button>
      }
    >
      <CustomForm id="create-form" onSubmit={onSubmit} />
    </CustomModal>
  );
}

export default CreateContact;
