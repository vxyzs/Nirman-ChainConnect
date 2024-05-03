'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';


import ComplexTable from 'views/admin/orders/components/ComplexTable';

import React from 'react';
import ongoingOrders from 'views/admin/orders/variables/ongoingOrders';
import pastOrders from 'views/admin/orders/variables/pastOrders';


export default function DataTables() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid mb="20px" spacing={{ base: '20px', xl: '20px' }}>
        <ComplexTable tableData={ongoingOrders} />
        <ComplexTable tableData={pastOrders} />
      </SimpleGrid>
    </Box>
  );
}

