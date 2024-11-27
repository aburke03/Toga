import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartItem, TimeSlot } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SchedulePageProps {
  purchasedItems: CartItem[];
}

export default function PostPaymentSchedule() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showDayError, setShowDayError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);
  
  // For demo purposes, using the first sample item
  const item = {
    id: '1',
    title: 'Black Cowboy Hat',
    description: 'Size: Small',
    price: 10,
    availableDays: [
      {
        date: 'Dec 7',
        timeSlots: [
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true }
        ]
      },
      {
        date: 'Dec 8',
        timeSlots: [
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true }
        ]
      },
      {
        date: 'Dec 9',
        timeSlots: [
          { time: '10:00', available: true },
          { time: '10:30', available: true },
          { time: '11:00', available: true }
        ]
      }
    ]
  };

  const toggleDate = (date: string) => {
    if (selectedDay === date) {
      setSelectedDay(null);
      setSelectedTime(null); // Clear time when deselecting day
    } else {
      setSelectedDay(date);
      setSelectedTime(null); // Clear previously selected time
    }
    setShowDayError(false);
  };

  const toggleTime = (date: string, time: string) => {
    if (date !== selectedDay) {
      setShowDayError(true);
      return;
    }
    
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
    setShowTimeError(false);
  };

  const handleNext = async () => {
    if (!selectedDay) {
      setShowDayError(true);
      return;
    }

    if (!selectedTime) {
      setShowTimeError(true);
      return;
    }

    const selectedSchedule = {
      item: {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
      },
      selectedDay,
      selectedTime,
      purchaseDate: new Date().toISOString(),
    };

    try {
      const existingPurchases = await AsyncStorage.getItem('purchases');
      const purchases = existingPurchases ? JSON.parse(existingPurchases) : [];
      purchases.push(selectedSchedule);
      await AsyncStorage.setItem('purchases', JSON.stringify(purchases));
      console.log('Purchase stored successfully:', selectedSchedule);
      
      setTimeout(() => {
        router.push('/chat');
      }, 100);
    } catch (error) {
      console.error('Error storing purchase:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Schedule Pickup</Text>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Select available days for pickup:</Text>
      {showDayError && (
        <Text style={styles.errorText}>Please select exactly one day</Text>
      )}
      
      <ScrollView style={styles.datesContainer}>
        {item.availableDays.map(day => (
          <View key={day.date} style={styles.dayContainer}>
            <Pressable 
              style={[
                styles.dateButton,
                selectedDay === day.date && styles.dateButtonSelected
              ]}
              onPress={() => toggleDate(day.date)}
            >
              <Text style={[
                styles.dateText,
                selectedDay === day.date && styles.dateTextSelected
              ]}>
                {day.date}
              </Text>
            </Pressable>

            {selectedDay === day.date && (
              <View style={styles.timeSlotsContainer}>
                {showTimeError && (
                  <Text style={styles.errorText}>Please select exactly one time slot</Text>
                )}
                {day.timeSlots.map(slot => (
                  <Pressable
                    key={slot.time}
                    style={[
                      styles.timeSlot,
                      selectedTime === slot.time && styles.timeSlotSelected
                    ]}
                    onPress={() => toggleTime(day.date, slot.time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === slot.time && styles.timeTextSelected
                    ]}>
                      {slot.time}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    padding: 20,
    paddingBottom: 10,
  },
  datesContainer: {
    flex: 1,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButtonSelected: {
    backgroundColor: '#000',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  dateTextSelected: {
    color: '#fff',
  },
  timeSlotsContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  timeSlotSelected: {
    backgroundColor: '#000',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  timeTextSelected: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
});