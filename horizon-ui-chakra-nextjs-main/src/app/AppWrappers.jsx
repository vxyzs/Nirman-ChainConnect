'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import Provider from 'components/provider';
import { UserProvider } from 'contexts/userContext';

export default function AppWrappers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Provider>
          <UserProvider>
            {children}
          </UserProvider>
        </Provider>
      </ChakraProvider>{' '}
    </CacheProvider>
  );
}
