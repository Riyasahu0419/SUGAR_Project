import React, { useState } from 'react';

const SugarPlay = () => {
  // Product data with both primary and hover images
  const products = [
    {
      id: 1,
      name: "SUGAR PLAY MEGA HYPE COLOUR CHANGING LIP OIL",
      price: 599.00,
      salePrice: null,
      rating: 5,
      reviews: 2,
      image: "https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-Play-Mega-Hype-Colour-Changing-Lip-Oil.jpg?v=1736171976&width=500",
      hoverImage: "https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-Play-Mega-Hype-Colour-Changing-Lip-Oil-2.jpg?v=1736506689&width=500",
      tag: null,
      colors: []
    },
    {
      id: 2,
      name: "SUGAR PLAY POWER DRIP LIP GLOSS",
      price: 399.00,
      salePrice: null,
      rating: 3,
      reviews: 1,
      image: "https://cdn.shopify.com/s/files/1/0906/2558/files/547160982-01.png?v=1739184183",
      hoverImage: "https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-Play-Power-Drip-Lip-Gloss-2.jpg?v=1736421361&width=500",
      tag: "ON SALE",
      
    },
    {
      id: 3,
      name: "SUGAR PLAY VIBE CHECK LIQUID LIPSTICK",
      price: 499.00,
      salePrice: null,
      rating: 5,
      reviews: 1,
      image: "https://cdn.shopify.com/s/files/1/0906/2558/files/547496939-08.png?v=1736851960",
      hoverImage: "https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-Play-Vibe-Check-Liquid-Lipstick-2.jpg?v=1736421372&width=500",
      tag: null,
      
    },
    {
      id: 4,
      name: "SUGAR PLAY HIGH KEY CHROME EYESHADOW",
      price: 249.00,
      salePrice: 499.00,
      rating: 1,
      reviews: 1,
      image: "https://cdn.shopify.com/s/files/1/0906/2558/files/546710496-01.jpg?v=1739183642",
      hoverImage: "https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-Play-High-Key-Chrome-Eyeshadow-2.jpg?v=1736509312&width=500",
      tag: "SAVE 50%",
      colors: []
    }
  ];

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold tracking-widest text-center my-8">SUGAR PLAY RANGE</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button className="bg-black text-white px-8 py-2 text-sm tracking-wider">
             VIEW ALL
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
 
  const [isHovering, setIsHovering] = useState(false);

  // Function to display stars based on rating
  const renderStars = (rating, reviews) => {
    if (reviews === 0) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < rating ? "text-black fill-black" : "text-gray-300 fill-gray-300"}`} 
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
        <span className="ml-1 text-xs">({reviews})</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div 
        className="relative mb-4 cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {product.tag && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
            {product.tag}
          </div>
        )}
        <img 
          src={isHovering ? product.hoverImage : product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-all duration-300 text-xs"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-opacity-0 hover:bg-opacity-10 h-full transition-all duration-300"></div>
      </div>
      
      <p className="text-xs font-medium tracking-wider text-center ">
        {product.name}
      </p>
      
      <div className="flex justify-center items-center mt-2 mb-2">
        <span className="font-medium">RS. {product.price.toFixed(2)}</span>
        {product.salePrice && (
          <span className="ml-2 text-gray-500 line-through text-sm">
            RS. {product.salePrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex justify-center mt-2">
        {renderStars(product.rating, product.reviews)}
      </div>

    
    </div>
  );
};

export default SugarPlay;