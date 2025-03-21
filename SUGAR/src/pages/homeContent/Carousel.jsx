import { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const carouselItems = [
    { id: 1, type: "video", source: "https://www.sugarcosmetics.com/cdn/shop/videos/c/vp/f59f89583449478bb50307013102a705/f59f89583449478bb50307013102a705.HD-1080p-7.2Mbps-44506516.mp4?v=0", thumbnail: "https://www.sugarcosmetics.com/cdn/shop/videos/c/vp/f59f89583449478bb50307013102a705/f59f89583449478bb50307013102a705.HD-1080p-7.2Mbps-44506516.mp4?v=0", alt: "Product Video" },
    { id: 2, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/AOF-DEWY-HP-3200x1200.jpg?v=1742207575&width=2000", alt: "SUGAR New Arrivals" },
    { id: 3, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/LA-LA-Love-Free-gift-HP-3200x1200_1.jpg?v=1739879590&width=1600", alt: "Makeup Sale" },
    { id: 4, type: "image", source: "https://www.sugarcosmetics.com/cdn/shop/files/Shehnaaz-Trousseau-Box-GWP_HP-Banners_3200-X-1200_424fcf9c-196c-4007-8a97-fcc48005ec8d.jpg?v=1742207986&width=2000", alt: "Beauty Bestsellers" },
    { id: 5, type: "video", source: "https://www.sugarcosmetics.com/cdn/shop/videos/c/vp/ae2a71a1a97844f2920cb3e6c73b87c9/ae2a71a1a97844f2920cb3e6c73b87c9.HD-1080p-7.2Mbps-42381401.mp4?v=0", thumbnail: "https://thumbnail-image-url.jpg", alt: "Product Video" }
  ];

  const [currentCarousel, setCurrentCarousel] = useState(0);
  const videoRefs = useRef({});

  useEffect(() => {
    let timer;
    const currentItem = carouselItems[currentCarousel];

    if (currentItem.type === "video" && videoRefs.current[currentItem.id]) {
      const videoEl = videoRefs.current[currentItem.id];
      videoEl.currentTime = 0;
      videoEl.play().catch(err => console.log("Video play error:", err));

      timer = setTimeout(() => {
        setCurrentCarousel((prev) => (prev + 1) % carouselItems.length);
      }, (videoEl.duration || 10) * 1000);
    } else {
      timer = setTimeout(() => {
        setCurrentCarousel((prev) => (prev + 1) % carouselItems.length);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [currentCarousel]);

  return (
    <div className="">
      <section className="w-full">
        <div className="relative w-full h-40 sm:h-64 md:h-96 lg:h-120 xl:h-144 overflow-hidden">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${currentCarousel === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {item.type === "image" ? (
                <img
                  src={item.source}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <video
                  ref={el => videoRefs.current[item.id] = el}
                  src={item.source}
                  poster={item.thumbnail}
                  className="w-full h-full object-cover object-center"
                  muted
                  playsInline
                  controls={false}
                  aria-label={item.alt}
                />
              )}
            </div>
          ))}

          {/* SplitIt Button - Visible on all carousel items */}
          <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 right-2 sm:right-4 md:right-6 z-20">
            {/* Navigation Dots Positioned Over the Images/Videos */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full bg-white bg-opacity-50">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarousel(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentCarousel === index ? 'bg-black scale-125' : 'bg-gray-400'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carousel;