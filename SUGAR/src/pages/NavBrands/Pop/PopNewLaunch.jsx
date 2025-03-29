import React, { useState } from 'react';

const PopLaunches = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'SUGAR POP SPF 50 Sunscreen With Vitamin C, Niacinamide & Hyaluronic Acid',
      price: 799.0,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-POP-SPF-50-Sunscreen-With-Vitamin-C-Niacinamide-Hyaluronic-Acid-50-gm-Kit-2.jpg?v=1743161775&width=600',
      hoverImage: 'https://cdn.shopify.com/s/files/1/0906/2558/files/720825076-a-content_pop-sunscreen_mobile-size_600-x-450_1.jpg?v=1742306229',
    },
    {
      id: 2,
      name: 'Vitamin C & Tea Tree Face Wash',
      price: 349.0,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Vitamin-C-Tea-Tree-Face-Wash-11.jpg?v=1740827918&width=800',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/Vitamin-C-Tea-Tree-Face-Wash-2_d2559e95.jpg?v=1740827838&width=600',
    },
    {
      id: 3,
      name: 'SUGAR POP Body Wash',
      price: 599.0,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-POP-Body-Wash-2_90cdcda1.jpg?v=1740049549&width=600',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-POP-Body-Wash-6_ccb08ad9.jpg?v=1740049557&width=800',
    },
    {
      id: 4,
      name: 'SUGAR POP All In One Glow Cream with Niacinamide And Glutathione SPF 20',
      price: 499.0,
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-POP-All-In-One-Glow-Cream-with-with-Niacinamide-And-Glutathione-Spf-20_e76e4ae5.jpg?v=1741777197&width=800',
      hoverImage: 'https://www.sugarcosmetics.com/cdn/shop/files/SUGAR-POP-All-In-One-Glow-Cream-with-with-Niacinamide-And-Glutathione-Spf-20-2_184ccf93.jpg?v=1741777209&width=600',
    },
  ];

  const getProductImage = (product) => {
    return hoveredProduct === product.id ? product.hoverImage : product.image;
  };

  return (
    <div className="mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-medium text-center tracking-widest mb-20">SUGAR POP NEW LAUNCH</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
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
            </div>
            <div className="flex-grow text-center">
              <h3 className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-1">
                {product.name}
              </h3>
              <p className="text-sm mb-3">RS. {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopLaunches;
