import React, { useState } from 'react';
import { Star, Gift } from 'lucide-react';

const EliteEdition = () => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState('ELITE EDITION');
  
  // State to track which product is being hovered
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Product data organized by category
  const productsByCategory = {
    'ELITE EDITION': [
    {
      id: 1,
      name: 'FAB 10 BEAUTY ESSENTIALS',
      currentPrice: 1399,
      originalPrice: 2273,
      discount: 38,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Fab-10-Beauty-Essentials_196d7e99.jpg?v=1742296381&width=600',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Fab-10-Beauty-Essentials-2.jpg?v=1742218407&width=500',
      backgroundColor: '#ff6b9c',
    },
    {
      id: 2,
      name: 'BORN TO LEAD MAKEUP KIT',
      currentPrice: 1299,
      originalPrice: 2045,
      discount: 36,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Born-to-Lead-Makeup-Kit.jpg?v=1740568385&width=600',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Born-to-Lead-Makeup-Kit-2.jpg?v=1740568386&width=500',
      backgroundColor: '#cb8cff',
    },
    {
      id: 3,
      name: 'BOSS YOUR LOOK BEAUTY KIT',
      currentPrice: 1199,
      originalPrice: 1673,
      discount: 28,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Boss-Your-Look-Beauty-Kit.jpg?v=1740654671&width=600',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Boss-Your-Look-Beauty-Kit-2.jpg?v=1740654673&width=500',
      backgroundColor: '#e6e6e6',
    },
    {
      id: 4,
      name: 'BRIDAL MAKEUP KIT',
      currentPrice: 1799,
      originalPrice: 3470,
      discount: 48,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Bridal-Makeup-Kit.jpg?v=1736171329&width=500',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Bridal-Makeup-Kit-2.jpg?v=1737111916&width=500',
      backgroundColor: '#e91e63',
      rating: 5,
      reviewCount: 5,
    }
  ],
  'ON-THE-GO ESSENTIALS': [
    {
      id: 5,
      name: 'MINI LIPSTICK SET',
      currentPrice: 999,
      originalPrice: 1499,
      discount: 33,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Holi-Day-Beauty-Essentials_2fefb59b.jpg?v=1741778913&width=600',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Holi-Day-Beauty-Essentials-2.jpg?v=1741778914&width=500',
      backgroundColor: '#ff4081',
    },
    {
      id: 6,
      name: 'COMPACT ESSENTIALS KIT',
      currentPrice: 1499,
      originalPrice: 2299,
      discount: 35,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Kritis-Beauty-Favourites-5.png?v=1742469249&width=500',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Kritis-Beauty-Favourites-5-2.jpg?v=1742469250&width=500',
      backgroundColor: '#4fc3f7',
    },
    {
      id: 7,
      name: 'TRAVEL MAKEUP BRUSH SET',
      currentPrice: 899,
      originalPrice: 1299,
      discount: 30,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Matte-As-Hell-Crayon-Lipstick-Minis-Set-of-3.jpg?v=1738665419&width=500',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Matte-As-Hell-Crayon-Lipstick-Minis-Set-of-3-2.jpg?v=1738665420&width=500',
      backgroundColor: '#9575cd',
      rating: 4,
      reviewCount: 12,
    },
    {
      id: 8,
      name: 'POCKET GLAM KIT',
      currentPrice: 1299,
      originalPrice: 1999,
      discount: 35,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Vineetas-Favourite-Makeup-Kit_6e849469.jpg?v=1740047992&width=500',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Vineetas-Favourite-Makeup-Kit_6e849469.jpg?v=1740047992&width=500',
      backgroundColor: '#4db6ac',
    }
  ]
  };

  // Get the products to display based on active category
  const products = productsByCategory[activeCategory];

  // Function to render filled star
  const renderStar = (filled, index) => {
    return (
      <Star 
        key={index} 
        size={14} 
        className={filled ? "text-black fill-black" : "text-black"} 
      />
    );
  };

  // Function to handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col items-center  mx-auto px-4 py-8">
      {/* Categories */}
      <div className="flex justify-center space-x-8 mb-12">
        <div 
          className={`pb-2 text-lg font-medium cursor-pointer ${activeCategory === 'ELITE EDITION' ? 'border-b-2 border-black' : 'text-gray-500'}`}
          onClick={() => handleCategoryClick('ELITE EDITION')}
        >
          ELITE EDITION
        </div>
        <div 
          className={`pb-2 text-lg font-medium cursor-pointer ${activeCategory === 'ON-THE-GO ESSENTIALS' ? 'border-b-2 border-black' : 'text-gray-500'}`}
          onClick={() => handleCategoryClick('ON-THE-GO ESSENTIALS')}
        >
          ON-THE-GO ESSENTIALS
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image and Overlay */}
            <div className="relative overflow-hidden mb-4">
              <div 
                className="relative h-96 w-full transition-all duration-300 ease-in-out"
                style={{ backgroundColor: product.backgroundColor }}
              >
                <img 
                  src={hoveredProduct === product.id ? product.hoverImage : product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover  transition-opacity duration-300"
                />
                
                {/* Discount Tag */}
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs">
                  SAVE {product.discount}%
                </div>
                
              </div>
            </div>
            
            {/* Product Details */}
            <div className="text-center">
              <p className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-1">
                {product.name}
              </p>
              <div className="flex justify-center items-center">
                <span className="font-medium mr-2">RS. {product.currentPrice.toLocaleString()}</span>
                <span className="text-gray-500 line-through text-sm">RS. {product.originalPrice.toLocaleString()}</span>
              </div>
              
              {/* Ratings */}
              {product.rating && (
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => renderStar(i < product.rating, i))}
                  <span className="text-sm ml-1">({product.reviewCount})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      <div className="mt-10">
        <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider">
          VIEW ALL
        </button>
      </div>
      
      {/* Windows Activation Notice */}
      
    </div>
  );
};

export default  EliteEdition;