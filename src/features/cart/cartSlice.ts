import { createSlice } from "@reduxjs/toolkit";

type Item = {
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  tableNumber: number | null;
  note: string;
  cartItems: Item[];
};

const initialState: CartState = {
  tableNumber: null,
  note: "",
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTableNo: (state, action) => {
      state.tableNumber = action.payload.tableNumber;
    },
    setNote: (state, action) => {
      state.note = action.payload.note;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.menuItemId === action.payload.menuItemId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.menuItemId === action.payload,
      );

      state.cartItems = state.cartItems.filter(
        (item) => item.menuItemId !== existingItem?.menuItemId,
      );
    },

    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.menuItemId === action.payload,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.menuItemId === action.payload,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.menuItemId !== action.payload.menuItemId,
          );
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setNote,
  setTableNo,
} = cartSlice.actions;
export default cartSlice.reducer;
