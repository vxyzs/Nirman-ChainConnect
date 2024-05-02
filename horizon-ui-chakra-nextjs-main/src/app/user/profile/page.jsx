'use client';

// Chakra imports
import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';


// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';


export default function ProfileOverview() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}

      <Banner 
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        avatar={avatar}
        name="Adela Parkson"
        job="Product Designer"
        posts="17"
        followers="9.7k"
        following="274"
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
          <TabPanel>

          </TabPanel>
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
