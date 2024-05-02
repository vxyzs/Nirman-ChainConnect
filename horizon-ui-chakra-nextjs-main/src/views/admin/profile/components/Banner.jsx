// Chakra imports
import { Box, Flex, Avatar, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following, ...rest } =
    props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const address = '0x37cE4B56d54E1f759CD49748E5F73b45A321958b';
  const bio ='Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae sed cumque molestias. Unde, omnis. Dolorem ex in non provident officia quaerat odit vero dignissimos assumenda explicabo fugit rem sequi voluptate blanditiis, perferendis at sapiente, soluta cumque beatae ipsum cupiditate neque nam excepturi omnis. Cum ullam voluptate porro commodi sequi?';

  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important',
  );
  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems="center" {...rest}>
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
        
      />

      <Avatar
        mx="auto"
        
        src={avatar.src}
        h="200px"
        w="200px"
        mt="-120px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="3xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {address}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Posts
          </Text>
        </Flex>
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {followers}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Followers
          </Text>
        </Flex>
        <Flex mx="auto" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Following
          </Text>
        </Flex>
      </Flex>
      <Text px="10%" py="2%" textAlign="justify">
        {bio}
      </Text>
    </Card>
  );
}


