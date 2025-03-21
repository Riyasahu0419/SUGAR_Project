import React, { useState } from 'react';

const NewLaunches = () => {
  const [activeTab, setActiveTab] = useState('newLaunches');
  const [showAllContent, setShowAllContent] = useState(false);
  // Track which product is being hovered
  const [hoveredProduct, setHoveredProduct] = useState(null);
  // Track selected color for each product
  const [selectedColors, setSelectedColors] = useState({});
    
  const products = {
    newLaunches: [
      {
        id: 1,
        name: 'ACE OF FACE DEWY FOUNDATION',
        price: 799.00,
        image: 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-3.jpg?v=1741431623&width=500',
        hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-4.jpg?v=1741431623&width=500',
        tagline: 'Dewy Finish, Dreamy Skin',
        colors: ['#e8c19a', '#e3c1a7', '#dfc0a0', '#d7b593', '#c9a985', '#b39a80', '#a58b75', '#9c7e6a', '#8d6a5a', '#7b5a4d'],
        colorImages: {
          '#e8c19a': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-3.jpg?v=1741431623&width=500',
          '#e3c1a7': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-4.jpg?v=1741431623&width=500',
          '#dfc0a0': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-5.jpg?v=1741431623&width=500',
          '#d7b593': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-6.jpg?v=1741431623&width=500',
          '#c9a985': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-7.jpg?v=1741431623&width=500',
          '#b39a80': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-8.jpg?v=1741431623&width=500',
          '#a58b75': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-9.jpg?v=1741431623&width=500',
          '#9c7e6a': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-10.jpg?v=1741431623&width=500',
          '#8d6a5a': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-11.jpg?v=1741431623&width=500',
          '#7b5a4d': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-of-Face-Dewy-Foundation-12.jpg?v=1741431623&width=500',
        }
      },
      {
        id: 2,
        name: 'GLIDE PEPTIDE SPF50 PA+++ LIP TREATMENT',
        price: 349.00,
        image: 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-2.jpg?v=1742296309&width=500',
        hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-3.jpg?v=1742296309&width=500',
        colors: ['#ECECE4' ,'#BC6444', '#84344C' ,'#7C3C2C'],
        colorImages:{
            '#ECECE4':'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-10.jpg?v=1742382713&width=600',
            '#BC6444':'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-12.jpg?v=1742382716&width=600',
            '#84344C':'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-13.jpg?v=1742382718&width=600',
            '#7C3C2C': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-SPF50-PA-Lip-Treatment-Kit-14.jpg?v=1742382719&width=600',

        }
      },
      {
        id: 3,
        name: 'CLOUD NINE NIACINAMIDE GLOW BLUSH',
        price: 599.00,
        image: 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-2_c0863876.jpg?v=1740048818&width=500',
        hoverImage: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Cloud-Nine---PDP-slide3_1.jpg?v=1736245664',
        tagline: 'BLUSH BRIGHTER, CARE DEEPER',
        colors: ['#eb9091', '#d4494c', '#af3964', '#801945', '#5a1431'],
        colorImages: {
          '#eb9091': 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-15.jpg?v=1739270719&width=600',
          '#d4494c': 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-16.jpg?v=1739270721&width=600',
          '#af3964': 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-18.jpg?v=1739270724&width=600',
          '#801945': 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-19.jpg?v=1739270726&width=600',
          '#5a1431': 'https://www.sugarcosmetics.com/cdn/shop/files/Cloud-Nine-Niacinamide-Glow-Blush-17.jpg?v=1739270722&width=600',
        }
      },
      {
        id: 4,
        name: 'GLIDE PEPTIDE SERUM LIPSTICK',
        price: 499.00,
        image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/699849721-glide-peptide-lipstick-slide4_231588e9-abb2-4bfc-8368-c423216fa86f.jpg?v=1739250284',
        hoverImage: 'https://cdn.shopify.com/s/files/1/0906/2558/files/699849719-glide-peptide-lipstick-slide3_0a1f7540-21de-444d-b4e1-891c56c57824.jpg?v=1739250284',
        tagline: 'MAKEUP REIMAGINED',
        colors: ['#bb5b3e', '#a62c2c', '#a02945', '#761f3f', '#421f2f', '#3c1515'],
        colorImages: {
          '#bb5b3e': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-Serum-Lipstick-16.jpg?v=1742296951&width=500',
          '#a62c2c': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-Serum-Lipstick-17.jpg?v=1742296951&width=500',
          '#a02945': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-Serum-Lipstick-18.jpg?v=1742296951&width=500',
          '#761f3f': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-Serum-Lipstick-19.jpg?v=1742296951&width=500',
          '#421f2f': 'https://www.sugarcosmetics.com/cdn/shop/files/Glide-Peptide-Serum-Lipstick-20.jpg?v=1742296951&width=500',
         
        }
      }
    ],
    bestsellers: [
      {
        id: 5,
        name: 'HYDRA BOOST MOISTURIZER',
        price: 699.00,
        image: 'https://www.sugarcosmetics.com/cdn/shop/files/Matte-Attack-Transferproof-Lipstick-Kit-2_29949b5c.jpg?v=1742296476&width=500',
        hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Matte-Attack-Transferproof-Lipstick-Kit-3_29949b5c.jpg?v=1742296476&width=500',
        colors: ['#ECECE4' ,'#BC6444', '#84344C' ,'#7C3C2C' ],
        colorImages:{
           

        }
      },
      {
        id: 6,
        name: 'SILK FINISH POWDER',
        price: 549.00,
        image: 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-2.jpg?v=1742296109&width=500',
        hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-3.jpg?v=1742296109&width=500',
        colors: ['#f2e2d0', '#e8d0b8', '#d7b99f', '#c19c7e', '#a17c5c'],
        colorImages: {
          '#f2e2d0': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-2.jpg?v=1742296109&width=500',
          '#e8d0b8': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-3.jpg?v=1742296109&width=500',
          '#d7b99f': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-4.jpg?v=1742296109&width=500',
          '#c19c7e': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-5.jpg?v=1742296109&width=500',
          '#a17c5c': 'https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-6.jpg?v=1742296109&width=500',
        }
      }
    ]
  };

  // Determine which products to display based on the active tab and showAllContent state
  const displayProducts = showAllContent 
    ? [...products.newLaunches, ...products.bestsellers]
    : products[activeTab === 'newLaunches' ? 'newLaunches' : 'bestsellers'];

  // Function to handle color selection
  const handleColorSelect = (productId, color) => {
    setSelectedColors({
      ...selectedColors,
      [productId]: color
    });
  };

  // Get the current image to display for a product based on hover state and selected color
  const getProductImage = (product) => {
    // If a color is selected for this product, show the corresponding color image
    if (selectedColors[product.id] && product.colorImages && product.colorImages[selectedColors[product.id]]) {
      return product.colorImages[selectedColors[product.id]];
    }
    
    // If product is being hovered and has a hover image, show the hover image
    if (hoveredProduct === product.id && product.hoverImage) {
      return product.hoverImage;
    }
    
    // Default to the main product image
    return product.image;
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 ">
        <h3 className="text-sm font-medium tracking-widest text-gray-600 mb-4">TRENDING AT SUGAR</h3>
        
        <div className="flex justify-center border-b border-gray-200">
          <button 
            onClick={() => {
              setActiveTab('newLaunches');
              setShowAllContent(false);
            }}
            className={`px-4 py-2 font-medium text-2xl ${activeTab === 'newLaunches' && !showAllContent ? 'border-b-2 border-black' : ''}`}
          >
            NEW LAUNCHES
          </button>
          <button 
            onClick={() => {
              setActiveTab('bestsellers');
              setShowAllContent(false);
            }}
            className={`px-4 py-2 font-medium text-2xl ${activeTab === 'bestsellers' && !showAllContent ? 'border-b-2 border-black' : ''}`}
          >
            BESTSELLERS
          </button>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map(product => (
          <div key={product.id} className="product-card flex flex-col">
            <div 
              className="relative mb-4 overflow-hidden group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <img 
                src={getProductImage(product)}
                alt={product.name} 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.tagline && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-amber-700 font-medium">{product.tagline}</p>
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <h3 className="text-center text-xs font-medium mb-2text-xs tracking-wider text-gray-500 uppercase mb-1">{product.name}</h3>
              <p className="text-center text-sm mb-3">RS. {product.price.toFixed(2)}</p>
              
              {product.colors && product.colors.length > 0 && (
                <div className="flex justify-center flex-wrap gap-1 mt-2">
                  {product.colors.map((color, index) => (
                    <button 
                      key={index}
                      className={`w-6 h-6 rounded-full border ${selectedColors[product.id] === color ? 'border-black ring-1 ring-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                      onClick={() => handleColorSelect(product.id, color)}
                    />
                  ))}
                </div>
              )}
              
             
            </div>
{/*             
            <button className="mt-4 w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
              ADD TO CART
            </button> */}
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      {!showAllContent && (
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAllContent(true)}
            className="px-8 py-3 bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            VIEW ALL
          </button>
        </div>
      )}
      
      {/* Gift Icon */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center relative hover:bg-red-600 transition-colors duration-300">
          <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            2
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      {/* "Go" Button */}
      
    </div>
  );
};

export default NewLaunches;