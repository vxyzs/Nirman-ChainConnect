// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdEdit } from 'react-icons/md';

export default function Event(props) {
  const { title, ranking, link, image, time, date, status, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const brandColor = useColorModeValue('brand.500', 'white');
  const bg = useColorModeValue('white', 'navy.700');
 
  return (
    <Card bg={status ? '#412AFB' : bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        <Box mt={{ base: '10px', md: '0' }}>
          <Text
            color={status ? 'white' : textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {title}
          </Text>
          <Flex>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              {status ? date  : "Pending"}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
