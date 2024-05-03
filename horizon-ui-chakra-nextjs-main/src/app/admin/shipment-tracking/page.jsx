'use client';
import React from 'react';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';

// Custom components

import ProductDetails from 'views/admin/shipment-tracking/components/ProductDetails';
import UploadDocuments from 'views/admin/shipment-tracking/components/UploadDocuments';

import EventComponent from 'views/admin/shipment-tracking/components/EventComponent';


export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{
          base: '1fr',
          xl: 'repeat(2, 1fr)',
          '2xl': '1fr 1fr 1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="40px">
              <ProductDetails
                title="Product Details"
                productName="Colorful Heaven"
                quantity="1"
                totalValue="1000"
                countryOfOrigin="USA"
                valuePerItem="1000"
                goodsType="Oil"
              />
              <ProductDetails
                title="Shipment Details"
                transactionId="123456"
                transactionDate="2021-09-01"
                currentStatus="In Transit"
                estimatedDeliveryDate="2021-09-01"
                insurance="Yes"
                transactionAmount="1000"
              />
            </SimpleGrid>
            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              View & Upload Documents
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: '20px', xl: '0px' }}
            >
              <UploadDocuments
                documentName="Invoice"
                uploadStatus={false}
                minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
                pe="20px"
                pb={{ base: '20px', lg: '20px' }}
              />
              <UploadDocuments
                documentName="Bill of Lading"
                uploadStatus={false}
                minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
                pe="20px"
                pb={{ base: '20px', lg: '20px' }}
              />
              <UploadDocuments
                documentName="Clearance Certificate"
                uploadStatus={true}
                minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
                pe="20px"
                pb={{ base: '20px', lg: '20px' }}
              />
            </SimpleGrid>
            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              Track Shipment
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: '20px', xl: '0px' }}
            >
              <EventComponent
                role="Exporter"
                event1={true}
                event2={true}
                event3={true}
              />
              <EventComponent
                role="Transporter"
                event1={true}
                event2={false}
                event3={false}
              />
              <EventComponent
                role="Importer"
                event1={false}
                event2={false}
                event3={false}
              />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
