import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductsfromServer } from "../functions/Functions";


export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = await getProductsfromServer();
    return products;
  }
);

const initialState = {
  products: [...(await getProductsfromServer())],
  loading: false,
  error: false,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const filteredProducts = [...state.products].filter((product) => {
        return product.category === action.payload;
      });
      state.products = filteredProducts;
    },
    filterProductsBySearch: (state, action) => {
      const enteredText = action.payload.toLowerCase();
      const filteredProducts = state.products.filter((product) => {
        if (enteredText === product.title.toLowerCase()) {
          return true;
        } else if (product.description.toLowerCase().includes(enteredText)) {
          return true;
        }
        return false;
      });

      state.products = filteredProducts;
    },
    filterProductByMinandMaxPrice: (state, action) => {
      const max = action.payload.maximum;
      const min = action.payload.minimum;
      const filteredProducts = state.products.filter((product) => {
        return product.price >= min && product.price <= max;
      });

      state.products = filteredProducts;
    },
    filterProductsFromMinToMax: (state, action) => {
      state.products.sort((a, b) => {
        return a - b;
      });
    },
    filterProductsFromMaxToMin: (state, action) => {
      state.products.sort((a, b) => {
        return b - a;
      });
    },
    filterProductsByRating: (state, action) => {
      const ratingValue = action.payload;
      state.products = state.products.filter((product) => {
        return product.rating >= ratingValue;
      });
    },
    reset: (state, action) => {
      state.products = fetchProducts();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
export const {
  filterProductsByCategory,
  filterProductsBySearch,
  filterProductByMinandMaxPrice,
  filterProductsFromMinToMax,
  filterProductsFromMaxToMin,
  filterProductsByRating,
  reset,
} = productSlice.actions;
