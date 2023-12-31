import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  deleteDataFromFireBase,
  deleteItemsFromFirebase,
  fetchSingleDataFromFireBase,
  getAllDataFromFireBase,
  setDataToFireBase,
  updateSingleDataToFireBase,
} from "../firebase/firebaseFunctions";
import { uniqueID } from "../functions/Functions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { where } from "firebase/firestore";

const initialState = {
  cartArray: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setItemsToCartFromDB: (state, action) => {
      const duplicateCarts = action.payload.filter((payloadCart) =>
        state.cartArray.some((cart) => cart.cartId === payloadCart.cartId)
      );
      
      if (duplicateCarts.length === 0) {
        state.cartArray.push(...action.payload);
      }
      
      if (action.payload.length === 0) {
        state.cartArray = [];
      }
    },
    addToCart: (state, action) => {
      const { product, userEmail, cartId } = action.payload;
      const duplicateCart = state.cartArray.some(
        (cart) => cart.product.id === product.id
      );
      if (duplicateCart) {

        toast.error("This Item already posted to the cart !!");
      } else {
        const cartId = uniqueID();
        const price = product.price || parseInt(product.productPrice);
        const quantity = 1;
        const discountPrice =Math.floor(price * (product.discountPercentage || 5)) / 100;
        const totalPrice = price * quantity - discountPrice;
        
        setDataToFireBase("Carts", cartId, {
          ...action.payload,
          quantity,
          discountPrice,
          totalPrice,
          cartId,
        });
        state.cartArray.push({...action.payload,quantity,discountPrice,totalPrice,cartId});

      }
    },
    updateCartItem: (state, action) => {
      const { id, quantity, discountPrice, totalPrice, cartId } =
        action.payload;

      const cartItem = state.cartArray.find((item, index) => index === id);
      if (cartItem) {
        cartItem.quantity = quantity;
        cartItem.discountPrice = discountPrice;
        cartItem.totalPrice = totalPrice;
        updateSingleDataToFireBase("Carts", cartId, {
          quantity: quantity,
          discountPrice: discountPrice,
          totalPrice: totalPrice,
        });
      } else {
        return state;
      }
    },
    removeFromCart: (state, action) => {
      const { index } = action.payload;
      const updatedCartArray = state.cartArray.filter((item, i) => i !== index);
      
      state.cartArray = updatedCartArray;
    },
   resetCart:  (state, action) => {
  const { userEmail } = action.payload;
    deleteItemsFromFirebase("Carts", where("userEmail", "==", userEmail));
  state.cartArray.splice(0, state.cartArray.length);
},
  },
});
export const {
  addToCart,
  removeFromCart,
  setItemsToCartFromDB,
  resetCart,
  updateCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
