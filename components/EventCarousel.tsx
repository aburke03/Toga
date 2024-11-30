import Carousel from 'react-native-ui-lib/carousel';
import React, {useEffect, useState} from 'react';
import EventCard from './EventCard';
import { View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";


export function EventCarousel() {

    const images = require.context('../assets/images', true);

    const [eventItems, setEventItems] = useState<any[]>([]);

    async function loadEvents() {
        let user:any;
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
            try {
                const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': "Bearer " + token,
                    },
                })

                if (!response.ok) {
                    router.replace('/login');
                    console.error(`HTTP error! status: ${response.status}`);
                } else {
                    user = await response.json();
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            router.replace('/login');
        }
        const request_body = {organization: user.id};
        const response = await fetch("https://backend-toga-r5s3.onrender.com/api/events?"+new URLSearchParams(request_body), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        } else {
            let items = await response.json();
            let arr = []
            for (let item of items) {
                arr.push({
                    name: item.title,
                    host: item.organizer_name,
                    image: item.image_url,
                    days: item.event_begin,
                    month: 'Nov'
                });
            }
            setEventItems(arr);
        }
    }

    useEffect(() => {
        loadEvents();
    }, [])

    return (
      <Carousel containerStyle={{height: 200, width: 361, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto'}}>
          {eventItems.map((item: any, index: any) => (
            <EventCard key={index} date={item.date} name={item.name} image={images('./'+item.image)} host={item.host} days={item.days} month={item.month} />
          ))}
      </Carousel>
    );

}