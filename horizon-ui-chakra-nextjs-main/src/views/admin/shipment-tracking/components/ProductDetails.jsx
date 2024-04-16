// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Information from 'views/admin/profile/components/Information';

// Assets
export default function ProductDetails(props) {
  const { ...rest } = props;
  const {
    title,
    productName,
    quantity,
    totalValue,
    countryOfOrigin,
    valuePerItem,
    goodsType,
    transactionAmount,
    transactionDate,
    transactionId,
    currentStatus,
    estimatedDeliveryDate,
    insurance,
  } = props;

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        {props.title}
      </Text>

      <SimpleGrid columns={2} gap="20px">
        <Information
          boxShadow={cardShadow}
          title={title=="Product Details"?"Product Name" : "Transaction Id"}
          value={title=="Product Details"?productName : transactionId}
        />
        <Information
          boxShadow={cardShadow}
          title={title=="Product Details"?"Quantity" : "Transaction Date"}
          value={title=="Product Details"?quantity : transactionDate}
        />
        <Information 
          boxShadow={cardShadow} 
          title={title=="Product Details"?"Total Value" : "Transaction Amount"}
          value={title=="Product Details"?totalValue : transactionAmount}
           />
        <Information
          boxShadow={cardShadow}
          title={title=="Product Details"?"Country of Origin" : "Current Status"}
          value={title=="Product Details"?countryOfOrigin : currentStatus}
        />
        <Information
          boxShadow={cardShadow}
          title={title=="Product Details"?"Value Per Item" : "Estimated Delivery Date"}
          value={title=="Product Details"?valuePerItem : estimatedDeliveryDate}
        />
        <Information
          boxShadow={cardShadow}
          title={title=="Product Details"?"Goods Type" : "Insurance"}
          value={title=="Product Details"?goodsType : insurance}
        />
      </SimpleGrid>
    </Card>
  );
}
