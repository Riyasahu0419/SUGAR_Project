import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items whenever the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://sugar-project.onrender.com/api/cart');
      const data = Array.isArray(response.data) ? response.data : [];
      setCartItems(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items. Please try again later.');
      setCartItems([]); // Fallback to empty array
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      // Note the capitalized 'Cart' in the URL to match the backend route
      const url = `https://sugar-project.onrender.com/api/cart/${itemId}`;
      console.log(`Attempting to remove item using: ${url}`);
      await axios.delete(url);
      
      // Only update the UI after successful API call
      setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item. Please try again.');
      
      // Log the specific error for debugging
      if (error.response) {
        console.log('Error response:', error.response.status, error.response.data);
      }
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      // First update the UI optimistically for better user experience
      setCartItems(prevItems => 
        prevItems.map(item => 
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      
      // Using the correct 'remove/:id' endpoint for PUT requests
      const url = `https://sugar-project.onrender.com/api/cart/${itemId}`;
      console.log(`Attempting to update quantity using: ${url}`);
      await axios.put(url, { quantity: newQuantity });
      
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity. Please try again.');
      
      // Log the specific error for debugging
      if (error.response) {
        console.log('Error response:', error.response.status, error.response.data);
      }
      
      // Revert the optimistic update
      fetchCartItems();
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Debug function to help identify issues
  const handleButtonClick = (action, itemId, quantity = null) => {
    console.log(`Attempting ${action} for item ${itemId}${quantity !== null ? ` with quantity ${quantity}` : ''}`);
    
    if (action === 'remove') {
      removeFromCart(itemId);
    } else if (action === 'increment') {
      updateQuantity(itemId, quantity + 1);
    } else if (action === 'decrement') {
      updateQuantity(itemId, quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">CART</h1>
        
        {error && (
          <div className="text-red-500 text-center py-2">{error}</div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="text-center">
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
                            onClick={() => handleButtonClick('decrement', item._id, item.quantity)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 text-gray-600"
                            onClick={() => handleButtonClick('increment', item._id, item.quantity)}
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
                          onClick={() => handleButtonClick('remove', item._id)}
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