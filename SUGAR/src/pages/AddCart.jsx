import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/cart');
        const data = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]); // Fallback to empty array
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      setCartItems(cartItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center ">CART</h1>
        
        {isLoading ? (
          <p className="text-center">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center ">
            <p className="text-lg mb-8">Your cart is empty</p>
            <a 
              href="/" 
              className="inline-block bg-black text-white py-3 px-8 font-medium"
            >
              CONTINUE SHOPPING
            </a>
          </div>
        ) : (
          <div>
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 mr-4">
                            <img className="h-16 w-16 object-cover" src={item.imageUrl} alt={item.name} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300">
                          <button 
                            className="px-3 py-1 text-gray-600"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 text-gray-600"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <div>
                <a 
                  href="/" 
                  className="inline-block bg-black text-white py-3 px-8 font-medium"
                >
                  CONTINUE SHOPPING
                </a>
              </div>
              <div className="text-right">
                <p className="text-lg mb-2">Subtotal: ${calculateTotal()}</p>
                <p className="text-sm text-gray-500 mb-4">Shipping & taxes calculated at checkout</p>
                <a 
                  href="/checkout" 
                  className="inline-block bg-black text-white py-3 px-8 font-medium"
                >
                  CHECKOUT
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCart;
