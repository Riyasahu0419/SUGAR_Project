import React, { useState, useEffect } from 'react';

const SugarInsta = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClip, setSelectedClip] = useState(null);
  const [videosPerPage, setVideosPerPage] = useState(6);

  // Determine videos per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVideosPerPage(2); // Mobile
      } else if (window.innerWidth < 1024) {
        setVideosPerPage(3); // Tablet
      } else if (window.innerWidth < 1280) {
        setVideosPerPage(4); // Small desktop
      } else {
        setVideosPerPage(6); // Large desktop
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoClips = [
    { 
      id: 1, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/aba1476b4ebf4e499de53f19348a954b.mp4", 
      title: "Beauty Tutorial", 
      author: "Sarah", 
      price: "₹799.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 2, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/c4a5c12c77844bffb088db87b34d0324.mp4", 
      title: "Blue Outfit", 
      author: "Jessica", 
      price: "₹999.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 3, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/62912cf1c06144c69baa0521dcc4b499.mp4", 
      title: "Orange & Blue Style", 
      author: "Priya", 
      price: "₹899.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 4, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/d4259af204914769bb9ba13e44deffd0.mp4", 
      title: "Casual Look", 
      author: "Amber", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 5, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/f418fc532c6e446393334e561300e00f.mp4", 
      title: "Bag Collection", 
      author: "Tina", 
      price: "₹1,499.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 6, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/188c0589cf3046b49ba5e8cf6f23c63a.mp4", 
      title: "Workout Outfit", 
      author: "Michelle", 
      price: "₹1,199.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 7, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/f706ea1697e04a0bb730f9d5b8dc4031.mp4", 
      title: "Athleisure Look", 
      author: "Michelle", 
      price: "₹1,399.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 8, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/0ede6c19ed6a4a19b7127e82549adbd0.mp4", 
      title: "Summer Vibes", 
      author: "Michelle", 
      price: "₹999.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 9, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/ff831fa9fb9347f9a1ab1cf8349f6ad4.mp4", 
      title: "Urban Streetwear", 
      author: "Michelle", 
      price: "₹1,599.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 10, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/e3353612e28f4b3ca736844682c85808.mp4", 
      title: "Minimalist Style", 
      author: "Michelle", 
      price: "₹899.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 11, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/452c92eec593469ba10513027d104c74.mp4", 
      title: "Chic Evening Look", 
      author: "Michelle", 
      price: "₹1,799.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 12, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/0c67981286f34218bfe7ade0e0bf618c.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 13, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/b030960cfa08402586d80dc071ce1d9e.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 14, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/782d2e691e194ca09f95111478b3c716.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 15, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/60bd92e5ff4a4e19842de0905feed099.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 16, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/4ade4202e2a0411a9488a964ae93c4d5.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 17, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/bba6a69965e64571899829ac823e5ba8.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    },
    { 
      id: 18, 
      thumbnail: "https://cdn.shopify.com/videos/c/o/v/f706ea1697e04a0bb730f9d5b8dc4031.mp4", 
      title: "Activewear Fit", 
      author: "Michelle", 
      price: "₹1,299.00", 
      productImage: "https://via.placeholder.com/150" 
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, videoClips.length - videosPerPage) : prevIndex - videosPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + videosPerPage >= videoClips.length
        ? 0
        : prevIndex + videosPerPage
    );
  };

  const openModal = (clip) => setSelectedClip(clip);
  const closeModal = () => setSelectedClip(null);

  return (
    <div className="flex flex-col min-h bg-white">
      {/* Header */}
      <header className="py-4 sm:py-6 md:py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-xl sm:text-2xl font-medium text-center tracking-widest">SUGAR INSTA</h1>
        </div>
      </header>

      {/* Main content - Video Gallery */}
      <main className="flex-grow container mx-auto px-4 py-4 sm:py-6">
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-800 hover:text-gray-600 focus:outline-none transition-transform hover:scale-110 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full shadow-md"
            aria-label="Previous"
          >
            ◀
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-800 hover:text-gray-600 focus:outline-none transition-transform hover:scale-110 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full shadow-md"
            aria-label="Next"
          >
            ▶
          </button>

          {/* Video slider */}
          <div className="overflow-hidden px-8">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * (100 / videosPerPage)}%)` }}
            >
              {videoClips.map((clip) => (
                <div
                  key={clip.id}
                  className={`flex-shrink-0 px-1 sm:px-2 cursor-pointer`}
                  style={{ width: `${100/videosPerPage}%` }}
                  onClick={() => openModal(clip)}
                >
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow aspect-[9/16]">
                    <video
                      src={clip.thumbnail}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 md:mt-6 overflow-x-auto py-2">
            {Array.from({ length: Math.ceil(videoClips.length / videosPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * videosPerPage)}
                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full ${
                  currentIndex === index * videosPerPage ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedClip && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden flex flex-col md:flex-row h-auto md:h-[80vh]">
            {/* Video - Full width on mobile, 2/3 on desktop */}
            <div className="w-full md:w-2/3 bg-black">
              <video
                src={selectedClip.thumbnail}
                className="w-full h-full object-cover aspect-[9/16] md:aspect-auto"
                autoPlay
                controls
              />
            </div>

            {/* Product Info - Full width on mobile, 1/3 on desktop */}
            <div className="w-full md:w-1/3 p-4 md:p-6 flex flex-col justify-between">
              <div>
                <img
                  src={selectedClip.productImage}
                  alt={selectedClip.title}
                  className="w-full h-20 sm:h-32 object-cover mb-3 md:mb-4"
                />
                <h2 className="text-lg font-semibold">{selectedClip.title}</h2>
                <p className="text-gray-500">{selectedClip.author}</p>
                <p className="text-xl font-bold mt-2">{selectedClip.price}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="#"
                  className="block bg-black text-white text-center py-2 rounded-md mb-3 hover:bg-gray-800 transition"
                >
                  SHOP NOW
                </a>
                <button
                  onClick={closeModal}
                  className="w-full text-gray-500 hover:text-gray-800 transition text-center py-2 border border-gray-300 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SugarInsta;