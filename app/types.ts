export interface TimeSlot {
    time: string;
    available: boolean;
  }
  
  export interface AvailableDay {
    date: string;
    timeSlots: TimeSlot[];
  }
  
  export interface CartItem {
    id: string;
    title: string;
    description: string;
    price: number;
    availableDays: AvailableDay[];
  }
  
  // Sample data
  export const sampleCartItem: CartItem = {
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
  }