// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, updateQuantity } from '../redux/cartSlice';
// import Swal from 'sweetalert2';

// const Cart = () => {
//   const cartItems = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to remove ${productName} from your cart?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, remove it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(removeFromCart(productId));
//         Swal.fire(
//           'Removed!',
//           'The item has been removed from your cart.',
//           'success'
//         )
//       }
//     })
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     dispatch(updateQuantity({ id: productId, quantity: parseInt(newQuantity) }));
//   };

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <div className="text-center py-16 bg-gray-100 rounded-lg">
//           <div className="empty-cart-animation mb-4">
//             🛒
//           </div>
//           <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
//           <a href="/" className="text-blue-500 hover:text-blue-700 transition duration-300">
//             Start Shopping
//           </a>
//         </div>
//       ) : (
//         <div className="space-y-8">
//           {cartItems.map(item => (
//             <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <div className="md:flex">
//                 <div className="md:flex-shrink-0">
//                   <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover md:w-48" />
//                 </div>
//                 <div className="p-8 w-full">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
//                       <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFromCart(item.id, item.name)}
//                       className="text-red-500 hover:text-red-700 transition duration-300"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="mt-4 flex items-center">
//                     <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-700">Quantity:</label>
//                     <input
//                       id={`quantity-${item.id}`}
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(item.id, e.target.value)}
//                       className="w-16 px-2 py-1 border rounded text-center"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="bg-gray-100 p-8 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//             <div className="flex justify-between items-center mb-4">
//               <span>Subtotal:</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <span>Shipping:</span>
//               <span>Free</span>
//             </div>
//             <div className="flex justify-between items-center text-xl font-bold">
//               <span>Total:</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <button className="w-full mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//       <style jsx>{`
//         @keyframes cartBounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .empty-cart-animation {
//           font-size: 5rem;
//           animation: cartBounce 2s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Cart;
/////////////////
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { ShoppingCart, Trash2, Minus, Plus, CreditCard } from "lucide-react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove ${productName} from your shopping cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(productId));
        Swal.fire(
          "Removed!",
          "The product has been removed from your shopping cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(
      updateQuantity({ id: productId, quantity: parseInt(newQuantity) })
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">
        Your Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="empty-cart-animation mb-4 text-indigo-500">
            <ShoppingCart size={80} />
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Your shopping cart is empty.
          </p>
          <a
            href="/"
            className="text-indigo-500 hover:text-indigo-700 transition duration-300"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-indigo-100"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-48 w-full object-cover md:w-48"
                  />
                </div>
                <div className="p-8 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                        {item.name}
                      </h2>
                      <p className="text-indigo-600 mb-4">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className="mr-2 text-gray-700"
                    >
                      Quantity:
                    </label>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-16 px-2 py-1 text-center"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white p-8 rounded-lg shadow-md border border-indigo-100">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">
              Order Summary
            </h2>
            <div className="flex justify-between items-center mb-4 text-gray-700">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-700">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-indigo-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-105 flex items-center justify-center">
              <CreditCard className="mr-2" size={20} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes cartBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .empty-cart-animation {
          animation: cartBounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Cart;
