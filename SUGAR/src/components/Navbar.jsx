import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';

// Custom Link component that uses regular anchor tags
const Link = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const [showPromotion, setShowPromotion] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="w-full">
      {/* Promotional banner */}
      {showPromotion && (
        <div className="bg-black text-white text-center py-2 relative flex items-center justify-center">
          <button className="absolute left-4 text-white">&lt;</button>
          <span className="font-medium">USE CODE: TREAT10 AND ENJOY 10% OFF ON ALL ORDERS</span>
          <button className="absolute right-4 text-white">&gt;</button>
        </div>
      )}
      
      {/* Main navbar */}
      <div className="    flex items-center justify-between px-4 py-3 hover:bg-pink-300 text-black">
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">SUGAR</span>
          </Link>
        </div>
        
        {/* Main navigation - desktop */}
        <nav className="hidden lg:flex items-center space-x-6 ">
          <Link to="/new" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">NEW</Link>
          <Link to="/lips" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">LIPS</Link>
          <Link to="/eyes" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">EYES</Link>
          <Link to="/face" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">FACE</Link>
          <Link to="/nails" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">NAILS</Link>
          <Link to="/skin" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">SKIN</Link>
          <Link to="/offers" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">OFFERS</Link>
          <Link to="/gifting" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">GIFTING</Link>
          <Link to="/sugar-pop" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">SUGAR POP</Link>
          <Link to="/sugar-play" className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200">SUGAR PLAY</Link>
        </nav>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 hover:text-pink-500 transition duration-200">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-gray-800 hover:text-pink-500 transition duration-200">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="text-gray-800 hover:text-pink-500 transition duration-200">
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/new" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">NEW</Link>
            <Link to="/lips" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">LIPS</Link>
            <Link to="/eyes" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">EYES</Link>
            <Link to="/face" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">FACE</Link>
            <Link to="/nails" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">NAILS</Link>
            <Link to="/skin" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">SKIN</Link>
            <Link to="/offers" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">OFFERS</Link>
            <Link to="/gifting" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">GIFTING</Link>
            <Link to="/sugar-pop" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">SUGAR POP</Link>
            <Link to="/sugar-play" className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500">SUGAR PLAY</Link>
            <div className="py-2 mt-2">
              <form className="relative">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button className="absolute right-2 top-2 text-gray-500">
                  <Search size={20} />
                </button>
              </form>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;