'use client';
import React, { useState, useEffect } from 'react';
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
  Textarea,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
import Link from 'next/link';
import { signIn, getProviders } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignUp() {
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
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [username, setUsername] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { data: session } = useSession();
  const [bio, setbio] = useState('');
  const [accNo, setaccNo] = useState(null);
  const router = useRouter();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [providers, setproviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setproviders(response);
    };
    setProviders();
  }, []);

  const handleSubmit = async () => {
    try {

      // Construct form data with the updated CID
      const formData = {
        id: session?.user.id,
        role: role,
        companyName: companyName,
        username: username,
        accNo: accNo,
        bio: bio,
      };

      console.log(formData);
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        router.push(`/${role.toLowerCase()}/default`);
      } else {
        console.error('Form submission failed');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth-Photoroom.png'}>
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
        mt={{ base: '40px', md: '2vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your details to sign up!
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
              <Image as={session.user.image} w="20px" h="20px" me="10px" />
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

          <FormControl>
            <FormLabel color={textColor}>Role</FormLabel>
            <Select value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="advertiser">Advertiser</option>
            </Select>
            {role === 'user' && (
              <FormControl>
                <Input
                  isRequired={true}
                  mt='16px'
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  mb="16px"
                />
              </FormControl>
            )}
            {role === 'advertiser' && (
              <FormControl>
                <Input
                  isRequired={true}
                  mt='16px'
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  mb="16px"
                />
              </FormControl>
            )}
            <FormControl>
              <Input
                isRequired={true}
                type="number"
                placeholder="Wallet Address"
                value={accNo}
                onChange={(e) => setaccNo(e.target.value)}
                mb="16px" />
            </FormControl>
            <FormControl>
              <Textarea
                isRequired={true}
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
                mb="16px" />
            </FormControl>
            <Button color={'blue'} onClick={handleSubmit}>Sign In</Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            mt="0px"
          >
            <Link href="/api/sign-in">
              <Text>Already registered ? Login</Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}