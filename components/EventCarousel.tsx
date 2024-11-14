import Carousel from 'react-native-ui-lib/carousel';
import React, { useState } from 'react';
import EventCard from './EventCard';
import { View } from 'react-native';


export function EventCarousel() {
    const [eventItems, setEventItems] = useState(
        [
            {id: 1, date: 'October 20', name: '90s Throwback', host: 'DZ', image: require('../assets/images/90s.jpg')},
            {id: 2, date: 'October 7', name: 'USA', host: 'Phi Mu', image: require('../assets/images/toga.png')}
        ]
    );

    return (
      <Carousel containerStyle={{height: 350, width: 350, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto'}}>
          {eventItems.map((item: any, index: any) => (
            <EventCard key={item.id} date={item.date} name={item.name} image={item.image} host={item.host}/>
          ))}
      </Carousel>
    );

}