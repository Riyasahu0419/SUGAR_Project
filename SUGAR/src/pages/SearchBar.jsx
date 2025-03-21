import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
  const popularChoices = [
    { name: 'FOUNDATION', path: '/foundation' },
    { name: 'CONCEALER', path: '/concealer' },
    { name: 'BULLET LIPSTICKS', path: '/bullet-lipsticks' },
    { name: 'LIPSTICK', path: '/lipstick' }
  ];
  
  const recommendedProducts = [
    { id: 1, name: 'ACE OF FACE DEWY FOUNDATION', price: 799.00, image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Ace-of-Face-Dewy-Foundation-2_b4f5555e_large.jpg?v=1741431621' },
    { id: 2, name: 'TIP TAC TOE NAIL LACQUER - CLASSIC DUO', price: 349.00, originalPrice: 398.00, image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Tip-Tac-Toe-Nail-Lacquer-Classic-Duo_large.jpg?v=1736172151', discount: '12%' },
    { id: 3, name: 'CRIMSON KISSES LIP SET', price: 899.00, originalPrice: 1197.00, image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Crimson-Kisses-Lip-Set_large.jpg?v=1736172096', discount: '25%' },
    { id: 4, name: 'MATTE ATTACK TRANSFERPROOF LIPSTICK', price: 999.00, originalPrice: 1398.00, image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Matte-Attack-Transferproof-Lipstick-Seal-The-Show-Lip-Primer_large.jpg?v=1736171904', discount: '29%' },
    { id: 5, name: 'MOUSSE MUSE LIP CREAM & FOUNDATION STICK', price: 999.00, originalPrice: 1158.00, image: 'https://cdn.shopify.com/s/files/1/0906/2558/files/Mousse-Muse-Lip-Cream-Foundation-Stick-Combo_large.jpg?v=1736171873', discount: '14%', tag: 'COMBO' }
  ];

  const filteredProducts = recommendedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const closeSearch = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.classList.contains('overlay-backdrop')) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <button onClick={toggleSearch} className="p-2 rounded-full hover:cursor-pointer text-black hover:text-pink-500 " aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-50 overlay-backdrop">
          <div className="w-full h-full flex items-start justify-center">
            <div className="bg-white text-black w-full max-w-4xl mt-12 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
              <div className="p-4 flex justify-between border-b">
                <div className="text-lg font-medium">Search</div>
                <input ref={searchInputRef} type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border rounded-md bg-black text-white" />
                <button onClick={closeSearch} className="text-gray-600 hover:cursor-pointer">❌</button>
              </div>

              <div className="p-4">
                <h3 className="uppercase font-medium">Popular Choices</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {popularChoices.map((choice, index) => (
                    <a key={index} href={choice.path} className="px-4 py-2 border rounded text-sm text-white bg-black">{choice.name} ➜</a>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t">
                <h3 className="uppercase font-medium">Recommended for you</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <div key={product.id} className="relative">
                        {product.discount && <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1">SAVE {product.discount}</div>}
                        {product.tag && <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1">{product.tag}</div>}
                        <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-md" />
                        <h3 className="text-sm font-medium text-black">{product.name}</h3>
                        <div className="flex justify-center gap-2">
                          <span className="font-medium text-black">RS. {product.price.toFixed(2)}</span>
                          {product.originalPrice && <span className="text-gray-500 text-sm line-through">RS. {product.originalPrice.toFixed(2)}</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No products found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
