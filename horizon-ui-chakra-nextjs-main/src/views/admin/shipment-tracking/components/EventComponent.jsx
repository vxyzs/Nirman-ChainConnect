// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import Project1 from 'img/profile/Project1.png';
import Project2 from 'img/profile/Project2.png';
import Project3 from 'img/profile/Project3.png';
// Custom components
import Event from './Event';
import Card from 'components/card/Card';
import Project from 'views/admin/profile/components/Project';

export default function EventComponent(props) {
  const { role, event1, event2, event3, ...rest } = props;
  // Chakra Color Mode
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
        {role}
      </Text>
      
      <Event
        boxShadow={cardShadow}
        mb="20px"
        date = "10/02/24"
        time = "21.09"
        status = {event1}
        title={role =="Exporter"? "Invoice Generation" : role =="Importer"? "Custom Clearance" : "Ship Departure"}
      />
      <Event
        boxShadow={cardShadow}
        mb="20px"
        date = "10/02/24"
        time = "21.09"
        status = {event2}
        title={role =="Exporter"? "Custom Clearance" : role =="Importer"? "Goods Arrival" : "Ship Halfway"}
      />
      <Event
        boxShadow={cardShadow}
        date = "10/02/24"
        time = "21.09"
        status = {event3}
        title={role =="Exporter"? "Goods Shipped" : role =="Importer"? "Payment" : "Ship Reaches Destination"}
      />
    </Card>
  );
}
