'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Textarea,
  Button,
  Flex,
  Box,
  Image,
  Divider,
  VStack,
  Input,
  Text,
  WrapItem,
  Grid,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { FaImage, FaLongArrowAltRight, FaVideo } from 'react-icons/fa';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import Card from 'components/card/Card';
import TableTopCreators from 'views/admin/default/components/TableTopCreators';
import { useRouter } from 'next/navigation';
import tableDataTopCreators from 'views/admin/default/variables/tableDataTopCreators';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
import { lighten } from '@chakra-ui/theme-tools';



const Page = () => {
  const mode = localStorage.getItem('chakra-ui-color-mode');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    caption: '',
    imageUrl: [],
    videoUrl: [],
  });
  const [posts, setPosts] = useState([]);
  const imageInputFile = useRef(null);
  const videoInputFile = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchPosts();
    console.log('mode', mode);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/post');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const constructIPFSUrl = (cid) =>
    `https://sapphire-decisive-termite-106.mypinata.cloud/ipfs/${cid}`;

  const handleFileChange = async (e, fileType) => {
    const file = e.target.files[0];
    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      setPost((prevState) => ({
        ...prevState,
        [`${fileType}Url`]: [...prevState[`${fileType}Url`], uploadedUrl],
      }));

      if (fileType === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleInputChange = (e) => {
    setPost((prevState) => ({
      ...prevState,
      caption: e.target.value,
    }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const dummyUserId = '66322645f450015c2071a181';
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: post.caption,
          imageUrl: post.imageUrl,
          videoUrl: post.videoUrl,
          userId: dummyUserId,
        }),
      });

      if (response.ok) {
        setPost((prevState) => ({
          ...prevState,
          imageUrl: [],
          videoUrl: [],
        }));
        setImagePreview(null);
        // Fetch updated posts after creating a post
        fetchPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const uploadFile = async (fileToUpload) => {
    try {
      const data = new FormData();
      data.set('file', fileToUpload);
      const res = await fetch('/api/files', {
        method: 'POST',
        body: data,
      });
      const resData = await res.json();
      return resData.IpfsHash;
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Trouble uploading file');
      return null;
    }
  };

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <Box flex="2">
            <Flex direction="column" alignItems="flex-start">
              <Textarea
                value={post.caption}
                onChange={handleInputChange}
                placeholder="What's happening?"
                size="sm"
                bg={mode === 'light' ? 'white' : '#101C44'}
                borderRadius="20px"
                padding={{ base: '10px', xl: '20px' }}
              />

              {imagePreview && (
                <Box mt="2">
                  <Image
                    src={imagePreview}
                    alt="Uploaded Image"
                    maxH="50px"
                    maxW="50px"
                    bg="grey"
                  />
                </Box>
              )}
              <Flex justifyContent="space-between" w="100%" mt="2">
                <Flex alignItems="center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputFile}
                    onChange={(e) => handleFileChange(e, 'image')}
                    style={{ display: 'none' }}
                    multiple
                    bg={mode === 'light' ? 'white' : '#101C44'}
                  />
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    mr="2"
                    onClick={() => imageInputFile.current.click()}
                  >
                    <FaImage />
                  </Button>
                  <input
                    type="file"
                    accept="video/*"
                    ref={videoInputFile}
                    onChange={(e) => handleFileChange(e, 'video')}
                    style={{ display: 'none' }}
                    multiple
                    bg={mode === 'light' ? 'white' : '#101C44'}
                  />
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => videoInputFile.current.click()}
                  >
                    <FaVideo />
                  </Button>
                </Flex>
                <Button
                  onClick={createPost}
                  colorScheme="blue"
                  bg="#6858FF"
                  textColor="white"
                  isLoading={submitting}
                >
                  Post
                </Button>
              </Flex>
              <Divider my="4" />
              {/* Post Cards */}
              <VStack spacing="4" alignItems="stretch" w="100%">
                {posts.map((post, index) => (
                  <Box
                    key={index}
                    p="4"
                    border="1px solid #E2E8F0"
                    bg={mode === 'light' ? 'white' : '#101C44'}
                    borderRadius="25px"
                  >
                    <WrapItem>
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </WrapItem>
                    <Text>{post.caption}</Text>
                    {/* Render images or videos here */}
                    {/* Example for rendering images */}
                    {post.imageUrl?.map((cid, i) => (
                      <Box key={`image-${i}`} mt="2">
                        <Image
                          src={constructIPFSUrl(cid)}
                          alt={`Image ${i}`}
                          maxW="100%"
                        />
                      </Box>
                    ))}
                    {/* Example for rendering videos */}
                    {post.videoUrl?.map((cid, i) => (
                      <Box key={`video-${i}`} mt="2">
                        <video controls src={constructIPFSUrl(cid)} />
                      </Box>
                    ))}
                    <Flex mt="2" justifyContent="space-around">
                      <Button>
                        <FcLike />
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/admin/default/${post._id}`);
                        }}
                      >
                        <FaRegComment />
                      </Button>

                      <>
                        <Button onClick={onOpen}>
                          <BiDonateHeart />
                        </Button>

                        <Modal
                          blockScrollOnMount={false}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Lets Support Content Creators</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Input placeholder="Enter Amount" />
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Support
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Flex>
          </Box>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
        >
          <Card px="0px" mb="20px">
            <TableTopCreators tableData={tableDataTopCreators} />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
};

export default Page;
