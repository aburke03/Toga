import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';

// Types
interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
}

// CartIcon component
export const CartIcon = () => {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.iconContainer}
      onPress={() => router.push('/cart')}
    >
      <Ionicons name="cart-outline" size={24} color="black" />
    </Pressable>
  );
};

// CartItem component
const CartItemComponent = ({ item, onRemove }: { item: CartItem, onRemove: () => void }) => (
  <View style={styles.cartItem}>
    <View style={styles.itemImage}>
      <Text style={styles.placeholderText}>[ ]</Text>
    </View>
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
    </View>
    <Pressable onPress={onRemove} style={styles.removeButton}>
      <Text style={styles.removeButtonText}>×</Text>
    </Pressable>
  </View>
);

// Main Cart page component
const Cart = () => {
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [items] = React.useState<CartItem[]>([
    {
      id: '1',
      title: 'Sample Cart Item',
      description: 'Sample item description...\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
      price: 1
    }
  ]);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  // Replace with your computer's local IP address and ensure you're running the server in a separate terminal
  const API_URL = 'http://192.168.1.171:8080';

  const fetchPaymentSheetParams = async () => {
    try {
      console.log('Attempting to fetch payment sheet params');
      console.log('API URL:', `${API_URL}/payment-sheet`);
      console.log('Request body:', JSON.stringify({ amount: total * 100 }));
  
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }),
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Successfully received payment sheet params:', responseData);
      return responseData;
    } catch (error) {
      console.error('Detailed fetch error:', error);
      if (error instanceof Error) {
        console.error('Error type:', error.constructor.name);
      } else {
        console.error('Unknown error type');
      }
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error type');
      }
      if (error instanceof TypeError) {
        console.error('Network error details:', {
          error: error,
          stack: error.stack
        });
      }
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "TOGA",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'John Doe',
        }
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in initializePaymentSheet:', error);
      throw error;
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        throw error;
      }
      
      Alert.alert('Success', 'Your order is confirmed!');
      // You might want to clear the cart or navigate somewhere here
      // router.push('/order-confirmation');
    } catch (error) {
      console.error('Error in openPaymentSheet:', error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await initializePaymentSheet();
      await openPaymentSheet();
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Payment Error',
        'There was a problem processing your payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Your Shopping Cart</Text>
      </View>
      
      <View style={styles.itemsContainer}>
        {items.map(item => (
          <CartItemComponent 
            key={item.id} 
            item={item} 
            onRemove={() => console.log('Remove item')}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.checkoutButton,
            loading && styles.checkoutButtonDisabled
          ]}
          onPress={handleCheckout}
          disabled={loading || items.length === 0}
        >
          <Text style={styles.checkoutButtonText}>
            {loading ? 'Processing...' : 'Checkout'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
    zIndex: 1,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    marginRight: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 13,
    color: '#000',
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '300',
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    color: '#000',
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#666',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default Cart;