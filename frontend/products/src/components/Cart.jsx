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
      confirmButtonColor: "#3B82F6",
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
    <div className="container mx-auto px-4 py-8 bg-blue-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Your Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="empty-cart-animation mb-4 text-blue-500">
            <ShoppingCart size={80} />
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Your shopping cart is empty.
          </p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-blue-600 mb-4">
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
          ))}
          <div className="bg-white p-8 rounded-lg shadow-md border border-blue-100">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">
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
            <div className="flex justify-between items-center text-xl font-bold text-blue-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex items-center justify-center">
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
