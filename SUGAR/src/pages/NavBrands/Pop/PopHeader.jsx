import { useState, useEffect } from 'react';

const PopHead = () => {
  const [currentPop, setCurrentPop] = useState(0);
  
  const PopItems = [
    { id: 1, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/Launch-SUGAR-POP-Ultrastay-Transferproof-Lipstick-HP-1920x453_3.jpg?v=1734954480&width=1800", alt: "Beauty Bestsellers" },
    { id: 4, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/All-in-Makeup-Beauty-Kit---Homepage-Banner_LP.gif?v=1734955374&width=1800", alt: "SUGAR New Arrivals" },
    { id: 2, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/Complete_Makeup_Kit-HP_LP1920X453.jpg?v=1734958714&width=1800", alt: "Makeup Sale" },
    { id: 3, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/Pretty-Picks-Makeup-Kit-HP-Banner-Web_With-Bookmark.jpg?v=1734958788&width=1800", alt: "Beauty Bestsellers" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPop((prev) => (prev + 1) % PopItems.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPop]);

  return (
    <div className="w-full">
      <section className="w-full">
        <div className="relative w-full h-40 sm:h-64 md:h-96 lg:h-screen/2 xl:h-screen/2 overflow-hidden">
          {PopItems.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                currentPop === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {item.type === "image" && (
                <img
                  src={item.source}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 px-3 py-1 rounded-full bg-white bg-opacity-50">
            {PopItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPop(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPop === index ? 'bg-black scale-125' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopHead;