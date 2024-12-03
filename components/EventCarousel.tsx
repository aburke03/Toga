import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-ui-lib/carousel';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const EventCard = ({name, image, host, days}: {name: string, image: string, host: string, days: string}) => {
  // Format the date string to a more readable format
  const images = require.context('../assets/images', true);
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      time: date.toLocaleString('default', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formattedDate = formatDate(days);

  return (
    <View style={styles.card}>
      <Image source={images('./' + image)} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{formattedDate.month}</Text>
          <Text style={styles.day}>{formattedDate.day}</Text>
          <Text style={styles.time}>{formattedDate.time}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>{name}</Text>
          <Text style={styles.host}>Host: {host}</Text>
        </View>
      </View>
    </View>
  );
};

export function EventCarousel() {
  const images = require.context('../assets/images', true);
  const [eventItems, setEventItems] = useState<{ date: string, name: any, host: any, image: any, event_begin: any }[]>([]);

  async function loadEvents() {
    let user;
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
          method: "GET",
          headers: {
            'Authorization': "Bearer " + token,
          },
        });

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

    const request_body = { organization: user.id };
    const response = await fetch("https://backend-toga-r5s3.onrender.com/api/events?" + new URLSearchParams(request_body), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      let items = await response.json();
      let arr = items.map((item: { date: string, title: any, organizer_name: any, image_url: any, event_begin: any }) => ({
        date: item.event_begin,
        name: item.title,
        host: item.organizer_name,
        image: item.image_url,
      }));
      setEventItems(arr);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Your Events</Text>
        <Carousel
          containerStyle={styles.carousel}
          pageControlPosition="under"
          pageControlProps={{
            size: 6,
            spacing: 8,
            color: '#D1D5DB',
            inactiveColor: '#6B7280',
          }}
          autoplay={true} 
          autoplayInterval={3500}
          loop={true}
        >
          {eventItems.map((item, index) => (
            <EventCard
              key={index}
              name={item.name}
              image={item.image}
              host={item.host}
              days={item.date}
            />
          ))}
        </Carousel>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    alignSelf:'center',
  },
  carousel: {
    height: 240,
    width: '92%',
    marginHorizontal: 'auto',
  },
  card: {
    height: '100%',
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'uppercase',
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  host: {
    fontSize: 14,
    color: '#E5E7EB',
  },
});

export default EventCarousel;