'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { useUser } from 'contexts/userContext';
import Router from 'next/navigation';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

import { signIn, getProviders } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  // Chakra color mode
  const { user } = useUser();
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const { data: session } = useSession();
  const [providers, setproviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setproviders(response);
    };
    setProviders();
  }, []);

  const handleSignIn = async () => {
   // Example provider, replace with your desired provider ID
    if(user){
      router.push(`/${user.role}/default`);
    }
  };
  console.log(user?.role);
  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          {session ? (
        <Button
            onClick={handleSignIn}
            fontSize="sm"
            me="0px"
            mb="20px"
            py="15px"
            h="40px"
            borderRadius="16px"
            bgColor={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
        >
            <Image src={session.user.image} width={20} height={20} me="10px" />
            {session.user.email}
        </Button>
        ) : (
        providers &&
        Object.values(providers).map((provider) => (
            <Button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            fontSize="sm"
            me="0px"
            mb="20px"
            py="15px"
            h="40px"
            borderRadius="16px"
            bgColor={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
            </Button>
        ))
        )}
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
