export interface CartItem {
  id: string;
  title: string;
  price: number;
  size: string;
  buyType: string;
  image?: string;
}

export interface Purchase extends CartItem {
  selectedDay: string;
  selectedTime: string;
  purchaseDate: string;
}

export const CART_STORAGE_KEY = 'cart_items';
export const PURCHASES_STORAGE_KEY = 'purchases';