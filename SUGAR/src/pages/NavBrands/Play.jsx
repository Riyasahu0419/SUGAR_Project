import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, ChevronDown, X } from 'lucide-react';
import axios from 'axios';

const Play = () => {
   const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [sortOption, setSortOption] = useState('default');
     const [selectedProduct, setSelectedProduct] = useState(null);
     
     useEffect(() => {
       const fetchProducts = async () => {
         try {
           const response = await fetch('https://sugar-project.onrender.com/api/play/Play');
           if (!response.ok) throw new Error('Failed to fetch products');
           const data = await response.json();
   
           if (data.data && Array.isArray(data.data) && data.data.length > 0 && Array.isArray(data.data[0].products)) {
             setProducts(data.data[0].products);
           } else {
             throw new Error("Invalid API response format");
           }
         } catch (err) {
           console.log("Error fetching products:", err);
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
   
       fetchProducts();
     }, []);
   
     const sortProducts = (productsToSort) => {
       switch (sortOption) {
         case 'priceAsc': return [...productsToSort].sort((a, b) => a.price - b.price);
         case 'priceDesc': return [...productsToSort].sort((a, b) => b.price - a.price);
         case 'ratingDesc': return [...productsToSort].sort((a, b) => b.rating - a.rating);
         case 'nameAsc': return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
         default: return productsToSort;
       }
     };
   
     const handleAddToCart = async (product) => {
       try {
         // Prepare the product data to send to the backend
         const cartItem = {
           name: product.name,
           price: product.price,
           imageUrl: product.image,
           quantity: 1, // Default quantity
           productId: product.id // To identify the original product
         };
   
         // Use the same base URL as your product API
         await axios.post('https://sugar-project.onrender.com/api/cart/add', cartItem);
         
         // Show success message
         alert(`${product.name} added to cart!`);
       } catch (error) {
         console.error('Error adding item to cart:', error);
         alert('Failed to add item to cart. Please try again.');
       }
     };
   
     const openProductPopup = (product) => {
       setSelectedProduct(product);
     };
   
     const closeProductPopup = () => {
       setSelectedProduct(null);
     };
   
     const sortedProducts = sortProducts(products);
   
     if (loading) return <div className="text-center p-4 mt-50">Loading...</div>;
     if (error) return <div className="text-red-500 p-4 mt-50">Error: {error}</div>;
   
     return (
       <div className="container mx-auto mt-20">
         {/* Sorting Bar (Sticky Below Navbar) */}
         <div className="border-b border-t py-2 px-4 sticky top-22 bg-white z-50">
           <div className="flex justify-end items-center">
             {/* Sorting Dropdown */}
             <div className="relative">
               <select 
                 value={sortOption} 
                 onChange={(e) => setSortOption(e.target.value)}
                 className="text-sm text-gray-700 bg-white border-none focus:outline-none"
               >
                 <option value="default">SORT BY</option>
                 <option value="priceAsc">Price: Low to High</option>
                 <option value="priceDesc">Price: High to Low</option>
                 <option value="ratingDesc">Top Rated</option>
                 <option value="nameAsc">Name: A to Z</option>
               </select>
             </div>
           </div>
         </div>
   
         {/* Products Grid */}
         <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
           {sortedProducts.map((product) => (
             <div key={product.id} className=" rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
               {/* Clickable Image (Opens Popup) */}
               <div className="relative cursor-pointer" onClick={() => openProductPopup(product)}>
                 <img src={product.image} alt={product.name} className="w-full h-54 object-cover px-30" />
               </div>
   
               {/* Product Details */}
               <div className="p-4">
                 <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                 <p className="text-gray-600 mb-2">{product.description}</p>
                 <div className="flex justify-between items-center">
                   <span className="text-lg font-semibold text-gray-900">
                     {product.price ? `$${product.price.toFixed(2)}` : 'Price Unavailable'}
                   </span>
                 </div>
               </div>
   
               {/* Add to Cart Button */}
               <div className="p-4">
                 <button 
                   onClick={() => handleAddToCart(product)}
                   className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-purple-400 transition w-full"
                 >
                   Add to Cart
                 </button>
               </div>
             </div>
           ))}
         </div>
   
         {/* Product Popup (Modal) */}
         {selectedProduct && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
               {/* Close Button */}
               <button className="absolute top-2 right-2" onClick={closeProductPopup}>
                 <X size={24} />
               </button>
   
               <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-84 object-cover rounded-md px-25" />
               <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
               <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
               <p className="text-lg font-semibold mt-2">${selectedProduct.price?.toFixed(2)}</p>
   
               <div className="mt-4 flex space-x-4">
                 <button 
                   onClick={() => {
                     handleAddToCart(selectedProduct);
                     closeProductPopup();
                   }}
                   className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-purple-400 transition flex-1"
                 >
                   Add to Cart
                 </button>
                 
                 <a 
                   href="/cart" 
                   className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition flex-1 text-center"
                 >
                   View Cart
                 </a>
               </div>
             </div>
           </div>
         )}
       </div>
     );
   };
export default Play;
