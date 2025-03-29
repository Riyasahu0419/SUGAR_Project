import React, { useState } from 'react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card', // Default to card
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    products: [{ id: 1, name: 'Sample Product', price: 99.99, quantity: 1 }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return formData.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('https://sugar-project.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Order placed successfully!');
        // Reset form or redirect to confirmation page
      } else {
        setMessage(`Error: ${data.message || 'Failed to place order'}`);
      }
    } catch (error) {
      setMessage('Error connecting to server. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans mt-30">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md text-center ${
          message.includes('Error') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'
        }`}>
          {message}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 font-medium text-gray-600">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 font-medium text-gray-600">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1 font-medium text-gray-600">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block mb-1 font-medium text-gray-600">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-1 font-medium text-gray-600">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="zipCode" className="block mb-1 font-medium text-gray-600">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1 font-medium text-gray-600">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-t border-gray-200 pt-6">Payment Method</h2>
            
            <div className="mb-6">
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">UPI</span>
                </label>
              </div>
            </div>
            
            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="cardNumber" className="block mb-1 font-medium text-gray-600">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    required={formData.paymentMethod === 'card'}
                    className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block mb-1 font-medium text-gray-600">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required={formData.paymentMethod === 'card'}
                    className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block mb-1 font-medium text-gray-600">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required={formData.paymentMethod === 'card'}
                      className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block mb-1 font-medium text-gray-600">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required={formData.paymentMethod === 'card'}
                      className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {formData.paymentMethod === 'upi' && (
              <div className="mb-6">
                <label htmlFor="upiId" className="block mb-1 font-medium text-gray-600">UPI ID</label>
                <div className="flex">
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@bankname"
                    required={formData.paymentMethod === 'upi'}
                    className="w-full p-3 border border-gray-300 rounded-l-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-4 flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Enter your UPI ID (e.g., yourname@okaxis, yourname@ybl)</p>
                
                <div className="mt-4 grid grid-cols-5 gap-2">
                  <div className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                    <img src="/api/placeholder/50/30" alt="Google Pay" className="mx-auto" />
                    <p className="text-xs mt-1">Google Pay</p>
                  </div>
                  <div className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                    <img src="/api/placeholder/50/30" alt="PhonePe" className="mx-auto" />
                    <p className="text-xs mt-1">PhonePe</p>
                  </div>
                  <div className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                    <img src="/api/placeholder/50/30" alt="Paytm" className="mx-auto" />
                    <p className="text-xs mt-1">Paytm</p>
                  </div>
                  <div className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                    <img src="/api/placeholder/50/30" alt="BHIM" className="mx-auto" />
                    <p className="text-xs mt-1">BHIM</p>
                  </div>
                  <div className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                    <img src="/api/placeholder/50/30" alt="Amazon Pay" className="mx-auto" />
                    <p className="text-xs mt-1">Amazon Pay</p>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              type="submit" 
              className={`w-full py-4 px-4 bg-blue-600 text-white font-medium rounded-md text-base transition-colors ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {formData.products.map(product => (
                <div key={product.id} className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <div className="font-medium">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 my-4"></div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;