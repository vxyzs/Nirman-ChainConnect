'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Card from 'components/card/Card';

import ComplexTable from 'views/admin/analytics/components/ContractList';

import tableDataComplex from 'views/admin/analytics/variables/tableDataComplex';
import React from 'react';
import TableTopCreators from 'views/admin/analytics/components/TableTopCreators';
import AdminLayout from 'layouts/admin';
import tableColumnsTopCreators from 'views/admin/analytics/variables/tableDataTopCreators';
import tableDataTopCreators from 'views/admin/analytics/variables/tableDataTopCreators';

export default function Analytics() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ComplexTable tableData={tableDataComplex} />
        <Card px="0px">
          <TableTopCreators tableData={tableDataTopCreators} />
        </Card>
      </SimpleGrid>
    </Box>
  );
}
