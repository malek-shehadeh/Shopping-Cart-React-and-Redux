// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { addToCart } from '../redux/cartSlice';
// import Swal from 'sweetalert2';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [maxPrice, setMaxPrice] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handlePriceFilter = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     Swal.fire({
//       title: 'Added to Cart!',
//       text: `${product.name} has been added to your cart.`,
//       icon: 'success',
//       confirmButtonText: 'OK',
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Our Products</h2>

//       {/* Price Filter */}
//       <div className="mb-6">
//         <label className="block mb-2 text-sm font-medium text-gray-800">Filter by Price:</label>
//         <input
//           type="number"
//           value={maxPrice}
//           onChange={handlePriceFilter}
//           placeholder="Enter max price"
//           className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products
//           .filter((product) => maxPrice === '' || product.price <= maxPrice)
//           .map((product) => (
//             <div
//               key={product._id}
//               className="border p-4 rounded shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 bg-white"
//             >
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-64 object-cover rounded-t mb-4 hover:opacity-90 transition duration-300"
//               />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
//               <p className="text-gray-700 mb-2">{product.description}</p>
//               <p className="text-green-600 font-bold mb-4">${product.price.toFixed(2)}</p>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="w-full bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
/////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import {
  ShoppingBag,
  DollarSign,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePriceFilter = (event) => {
    setMaxPrice(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} has been added to your cart.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#10B981",
    });
  };

  // Filter products based on price
  const filteredProducts = products.filter(
    (product) => maxPrice === "" || product.price <= maxPrice
  );

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      {/* Price Filter */}
      <div className="mb-6 flex items-center justify-center">
        <Filter className="mr-2" />
        <label htmlFor="priceFilter" className="mr-2">
          Filter by Price:
        </label>
        <input
          type="number"
          id="priceFilter"
          value={maxPrice}
          onChange={handlePriceFilter}
          className="border rounded px-2 py-1"
          placeholder="Max price"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold flex items-center">
                <DollarSign className="mr-1" size={20} />
                {product.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300 flex items-center"
              >
                <ShoppingBag className="mr-2" size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({
            length: Math.ceil(filteredProducts.length / productsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
            className="ml-2 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
