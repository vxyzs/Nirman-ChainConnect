'use client';
// Chakra imports
import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
// Custom components
import Banner from 'views/admin/profile/components/Banner';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useUser } from 'contexts/userContext';
import { avatarAnatomy } from '@chakra-ui/anatomy';

export default function ProfileOverview() {
  const { user } = useUser();  
  // Assuming user object has properties like name, avatar, posts, followers, following

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}

    <Banner
    gridArea="1 / 1 / 2 / 2"
    
    avatar={avatarAnatomy} 
    name={user?.username}
    posts={user?.posts}
    followers={user?.followers}
    following={user?.following}
    />
      <Tabs>
        <TabList
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <Tab style={{ width: '33.33%' }}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="xl"
              mt="10px"
            >
              Posts
            </Text>
          </Tab>
          <Tab style={{ width: '33.33%' }}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="xl"
              mt="10px"
            >
              Liked Posts
            </Text>
          </Tab>
          <Tab style={{ width: '33.33%' }}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="xl"
              mt="10px"
            >
              Commercial Posts
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
