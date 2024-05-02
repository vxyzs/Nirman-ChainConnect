"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Textarea, Button, Flex, Box, Image, Divider, VStack, Text, WrapItem } from '@chakra-ui/react';
import { FaImage, FaVideo } from 'react-icons/fa';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const Page = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    caption: '',
    imageUrl: [],
    videoUrl: []
  });
  const [posts, setPosts] = useState([]);
  const imageInputFile = useRef(null);
  const videoInputFile = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: session } = useSession();



  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/post");
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
  const constructIPFSUrl = cid => `https://sapphire-decisive-termite-106.mypinata.cloud/ipfs/${cid}`;

  const handleFileChange = async (e, fileType) => {
    const file = e.target.files[0];
    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      setPost(prevState => ({
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

  const handleInputChange = e => {
    setPost(prevState => ({
      ...prevState,
      caption: e.target.value,
    }));
  };

  const createPost = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const UserId = session?.user?.id;
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: post.caption,
          imageUrl: post.imageUrl,
          videoUrl: post.videoUrl,
          userId: UserId,
        }),
      });

      if (response.ok) {
        setPost(prevState => ({
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


  const uploadFile = async fileToUpload => {
    try {
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data
      });
      const resData = await res.json();
      return resData.IpfsHash;
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Trouble uploading file");
      return null;
    }
  };

  return (
    <Flex direction="row" alignItems="flex-start" justifyContent="center" pt="20">
      <Box flex="2">
        <Flex direction="column" alignItems="flex-start">
          <Textarea
            value={post.caption}
            onChange={handleInputChange}
            placeholder="What's happening?"
            size="sm"
          />
          {imagePreview && (
            <Box mt="2">
              <Image src={imagePreview} alt="Uploaded Image" maxH="50px" maxW="50px" />
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
              <Box key={index} p="4" border="1px solid #E2E8F0" borderRadius="md">
                <WrapItem>
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </WrapItem>
                <Text>{post.caption}</Text>
                {post.imageUrl?.map((cid, i) => (
                  <Box key={`image-${i}`} mt="2">
                    <Image src={constructIPFSUrl(cid)} alt={`Image ${i}`} maxW="100%" />
                  </Box>
                ))}
                {/* Example for rendering videos */}
                {post.videoUrl?.map((cid, i) => (
                  <Box key={`video-${i}`} mt="2">
                    <video controls src={constructIPFSUrl(cid)} />
                  </Box>
                ))}
                <Flex mt="2" justifyContent="space-around">
                  <Button variant="outline" colorScheme="blue">Like</Button>
                  <Button variant="outline" colorScheme="blue" onClick={() => {
                    router.push(`/admin/default/${post._id}`);
                  }}>Comment</Button>
                  <Button variant="outline" colorScheme="blue">Reward</Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Flex>
      </Box>
      {/* Trending Topics Section */}
      <Box flex="1" p="5" px="5" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" borderRadius="md" >
        <Text fontWeight="bold" mb="2" fontSize="xl">Trending Topics</Text>
        <Text fontSize="lg" py='2'># Paisa <Text fontSize="sm" color="gray">(400 posts)</Text></Text>
        <Text fontSize="lg" py='2'># CP <Text fontSize="sm" color="gray">(300 posts)</Text></Text>
        <Text fontSize="lg" py="2"># DEV <Text fontSize="sm" color="gray">(200 posts)</Text></Text>
      </Box>

    </Flex>
  );
};

export default Page;
