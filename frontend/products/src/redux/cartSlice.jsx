// // import { createSlice } from '@reduxjs/toolkit';

// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState: {
// //     items: [],
// //   },
// //   reducers: {
// //     addToCart: (state, action) => {
// //       const existingItem = state.items.find(item => item.id === action.payload.id);
// //       if (existingItem) {
// //         existingItem.quantity += 1;
// //       } else {
// //         state.items.push({ ...action.payload, quantity: 1 });
// //       }
// //     },
// //     removeFromCart: (state, action) => {
// //       state.items = state.items.filter(item => item.id !== action.payload);
// //     },
// //     updateQuantity: (state, action) => {
// //       const { id, quantity } = action.payload;
// //       const item = state.items.find(item => item.id === id);
// //       if (item) {
// //         item.quantity = quantity;
// //       }
// //     },
// //   },
// // });

// // export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// // export default cartSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: []
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, name, price, imageUrl } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ id, name, price, imageUrl, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);
//       if (item) {
//         item.quantity = quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     }
//   }
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, price, imageUrl } = action.payload;
      const existingItem = state.items.find(item => item.id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id: _id, name, price, imageUrl, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;