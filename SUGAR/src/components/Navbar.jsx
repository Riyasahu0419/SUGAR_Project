import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import SearchBar from '../pages/SearchBar';
import WhatsappLogin from '../pages/WhatsappLogin';

const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);


const navItems = [
  { name: "NEW", path: "/new" },
  { name: "LIPS", path: "/lip" },
  { name: "EYES", path: "/eye" },
  { name: "FACE", path: "/FP" },
  { name: "NAILS", path: "/nail" },
  { name: "SKIN", path: "/skin" },
  { name: "OFFERS", path: "/offers" },
  { name: "GIFTING", path: "/gift" },
  { name: "SUGAR POP", path: "/sugar-pop" },
  { name: "SUGAR PLAY", path: "/play" },
];

const promotions = [
  "TREAT10 AND ENJOY 10% OFF ON ALL ORDERS",
  "FREE SHIPPING ON ORDERS ABOVE $50",
  "BUY 2 GET 1 FREE ON SELECT ITEMS",
  "SIGN UP AND GET 15% OFF ON YOUR FIRST ORDER"
];

const Navbar = () => {
  const [showPromotion, setShowPromotion] = useState(true);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const nextPromotion = () => {
    setCurrentPromotionIndex((prevIndex) =>
      prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPromotion = () => {
    setCurrentPromotionIndex((prevIndex) =>
      prevIndex === 0 ? promotions.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextPromotion, 5000);
    return () => clearInterval(interval);
  }, [currentPromotionIndex]);

  return (
    <div className="relative">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Promotional banner */}
      {showPromotion && (
        <div className="bg-black text-white text-center py-2 relative flex items-center justify-center">
          <button
            onClick={prevPromotion}
            className="absolute left-4 text-white hover:text-gray-400 transition duration-200"
          >
            &lt;
          </button>
          <span className="font-medium px-4">
            {promotions[currentPromotionIndex]}
          </span>
          <button
            onClick={nextPromotion}
            className="absolute right-4 text-white hover:text-gray-400 transition duration-200"
          >
            &gt;
          </button>
        </div>
      )}

      {/* Main navbar */}
      <div
      className={`fixed top-0 left-0 w-full z-20 transition duration-300 hover:bg-pink-300 ${
        isScrolled ? "bg-pink-300 shadow-md" : "bg-transparent mt-10"
      }`}
    >
      <div className="flex items-center justify-between px-10 py-6 text-black">
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="https://www.sugarcosmetics.com/cdn/shop/files/SUGAR_Cosmetics_Logo.png?v=1734589067&width=280" 
            alt="logo" 
            className="w-32 h-10" 
          />
        </Link>

        {/* Main navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-sm font-medium text-gray-800 hover:text-pink-500 hover:underline transition duration-200"
        >
          {item.name}
        </Link>
      ))}
    </nav>

    
        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 hover:text-pink-500 transition duration-200">
            <SearchBar/>
          </button>
          <Link  className="text-gray-800 hover:text-pink-500 transition duration-200">
            <WhatsappLogin/>
          </Link>
          <Link to="/cart" className="text-gray-800 hover:text-pink-500 transition duration-200">
            <ShoppingBag size={25} />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-4 py-2">
            {["NEW", "LIPS", "EYES", "FACE", "NAILS", "SKIN", "OFFERS", "GIFTING", "SUGAR POP", "SUGAR PLAY"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="py-2 text-sm font-medium text-gray-800 hover:text-pink-500"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
