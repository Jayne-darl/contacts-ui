import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import Home from '../src/components/home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" px="5" fontSize="md">
        <Grid minH="100vh" p={3}>
          <Home />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
