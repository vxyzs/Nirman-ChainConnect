"use client"
import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button, Flex } from '@chakra-ui/react';


const SinglePostPage = ({ postId }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    console.log(data);
                } else {
                    console.error('Failed to fetch post');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    return (
        <Box p={4} mt='16'>
            {post ? (
                <Box border="1px solid #E2E8F0" borderRadius="md" p={4}>
                    <Text>{post.caption}</Text>
                    {post.imageUrl?.map((url, index) => (
                        <Image key={index} src={url} alt={`Image ${index}`} mt={2} maxW="100%" />
                    ))}
                    {post.videoUrl?.map((url, index) => (
                        <video key={index} src={url} controls mt={2} />
                    ))}
                    <Flex justifyContent="space-around" mt={2}>
                        <Button variant="outline" colorScheme="blue">Like</Button>
                        <Button variant="outline" colorScheme="blue">Comment</Button>
                        <Button variant="outline" colorScheme="blue">Reward</Button>
                    </Flex>
                </Box>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
};

export default SinglePostPage;
