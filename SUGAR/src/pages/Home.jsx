import React, { useEffect, useState } from 'react';
import NewLaunches from './homeContent/NewLaunches';
import EliteEdition from './homeContent/EliteEdition';
import SugarInsta from './homeContent/SugarInsta';
import SugarPlay from './homeContent/SugarPlay';
import Carousel from './homeContent/Carousel';


const Homepage = () => {
  
  
  const [deal,SetDeal]= useState(0)
  const [price,SetPrice]= useState(0)
  const [email, setEmail] = useState('');
  
  // Mock data for carousel items
 

  const dealItem = [
    { id: 1, image: "https://www.sugarcosmetics.com/cdn/shop/files/Retention-offer-B2G1-banner-1600x400.gif?v=1742214321&width=1600", alt: "offers" },
    { id: 2, image: "https://www.sugarcosmetics.com/cdn/shop/files/Manicure-Kit-Offer-LP-Banner_1600-X-400.jpg?v=1742375178&width=1600", alt: "offers" },
    { id: 3, image: "https://www.sugarcosmetics.com/cdn/shop/files/1600x400_3303a932-a180-46ea-a8c9-03120e528c44.jpg?v=1741370125&width=1600", alt: "offers" },
    { id: 4, image: "https://www.sugarcosmetics.com/cdn/shop/files/500-off--LP-1600x400_3.gif?v=1739885560&width=1600", alt: "offers" }
    
  ];

  const priceItem = [
    { id: 1, image: "https://www.sugarcosmetics.com/cdn/shop/files/Clearance-Range-Products-LP-1600x400_2.gif?v=1737973789&width=1600", alt: "Price drop" },
    { id: 2, image: "https://www.sugarcosmetics.com/cdn/shop/files/BTR-Eyeshadow-Palette-LP--1600x400---shade02_1.gif?v=1740737407&width=1600", alt: "Price drop" },
   
    
  ];
  
 
  useEffect(() => {
    const interval = setInterval(() => {
      SetDeal((prevDeal) => (prevDeal + 1) % dealItem.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [dealItem.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      SetPrice((prevDeal) => (prevDeal + 1) % priceItem.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [priceItem.length]);

  
  // Current carousel index
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  // Custom link component
  const CustomLink = ({ href, className, children, onClick }) => {
    const handleClick = (e) => {
      e.preventDefault();
      if (onClick) onClick();
      console.log(`Navigating to: ${href}`);
      // In a real app, you could implement custom navigation logic here
    };

    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  };

  return (
    <div className="min-h-screen ">
      
      <main>
      {/* Main Content caorceItem */}
      <Carousel/>
        
     {/* NewLaunches content */}

      <NewLaunches/>

        {/* Featured Banner  DealItem*/}
        <header className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
        <h1 className="text-2xl font-medium text-center tracking-widest">DEAL FOR YOU</h1>
        </div>
      </header>
      <section className="relative">
      <div className="relative h-64 md:h-96">
        <img 
          src={dealItem[deal].image} 
          alt={dealItem[deal].alt} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {dealItem.map((_, index) => (
          <button
            key={index}
            onClick={() => SetDeal(index)}
            className={`w-2 h-2 rounded-full ${deal === index ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>

        {/* EliteEdition page */}
        <EliteEdition/>

        {/*Cloud Nine Niacinamide Glow Blush  */}

  <div className="min-h bg-gradient-to-r from-pink-300 to-blue-100 py-24 mt-3">
  
    <div className="flex flex-col md:flex-row items-center justify-center">
      {/* Image Section */}
      <div className="md:w-1/4  lg:w-1/3 ">
        <div className="relative">
          <img 
            src="https://www.sugarcosmetics.com/cdn/shop/files/Glow-Blush-HP-Banner_1200-X-1600_1_b5d826d9-951c-4a35-9a63-edd6cf7c1a42.jpg?v=1734677203&width=575" 
            alt="Cloud Nine Blush Product" 
            className=" mx-auto w-3/5 h-auto lg:mx-42"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/3 lg:w-1/3 text-center mt-4">
        <div className="uppercase text-[10px] tracking-wide text-gray-600 mb-1 underline">
          CLOUD NINE NIACINAMIDE GLOW BLUSH
        </div>
        <h2 className="text-base font-bold text-gray-800 mb-3 leading-snug">
          READY TO TAKE YOUR<br />
          BLUSH GAME TO CLOUD<br />
          NINE?
        </h2>
        <div className="text-gray-700 text-[11px] leading-relaxed">
          <p>
            Blush brighter, care deeper with our Cloud Nine <br /> Niacinamide Glow Blush that gives your cheeks the  <br />look straight  out of a dream. Infused with 8 botanical<br /> oils, Niacinamide, Kojic Acid, and Vitamin C, <br />it pampers your skin while giving you that <br /> lit-from-within flush.  
            Just a dab of this weightless<br /> formula gives you glowing, radiant cheeks. <br />Choose from playful shades like peachy pink or <br />flirty raspberry, made to flatter every Indian skin tone. <br />Glow-getter, are you in?
          </p>
        </div>
      </div>
    </div>
</div>

{/*   insta clips vedios */}

<SugarInsta/>

{/* price drop */}

      <header className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-medium text-center tracking-widest">PRICE DROP</h1>
        </div>
      </header>
        <section className="relative">

          <div className="relative h-64 md:h-96">
            <img 
            src={priceItem[price].image} 
            alt={priceItem[price].alt} 
            className="w-full h-full object-cover"
            /> 
          </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {priceItem.map((_,index)=>(
                <button
                key={index}
                onClick={()=>SetPrice(index)}
                className={`w-2 h-2 rounded-full ${price === index ? 'bg-black' : 'bg-gray-300'}`}
                />
                  
                ))}
               
          </div>
        </section>

{/* Ugar play range */}
      
        <SugarPlay/>
        
      


{/*  */}



<div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-r from-orange-400 to-orange-300 mt-8 mb-8">
  {/* Video Section - Left Side */}
  <div className="w-full md:w-1/2 h-auto md:h-screen relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-300">
    {/* Video element */}
    <video 
      className="w-full h-full md:max-h-none max-h-[500px] object-cover aspect-video" 
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src="https://www.sugarcosmetics.com/cdn/shop/videos/c/vp/efb13a88cef441a4be841298ddcd0e76/efb13a88cef441a4be841298ddcd0e76.HD-1080p-7.2Mbps-40064453.mp4?v=0" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  
  {/* Product Info - Right Side */}
  <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
    <div className="mb-8">
      <h3 className="text-gray-800 text-lg tracking-widest font-medium">PARTNER IN SHINE</h3>
      <h1 className="text-gray-800 text-3xl font-bold tracking-wide border-b border-gray-800 pb-2">TRANSFERPROOF LIP GLOSS</h1>
    </div>
    
    <div className="text-gray-800 space-y-4">
      <p>You've never been one to shy away from the spotlight. Well, now it's your time to own it! SUGAR Partner In Shine Transferproof Lip Gloss is here to deliver a shine that won't quit.</p>
      
      <p>Picture vibrant, long-lasting pigment that combines the glossy finish of a lip gloss with the staying power of a liquid lipstick. This beauty marvel is transferproof, waterproof and gives you a flawless, glass-like gloss that lasts up to 24 hours.</p>
      
      <p>The lightweight, non-sticky formula feels weightless on your lips, while ceramides, collagen and vitamin E hydrate and plump.</p>
      
      <p>With 15 stunning shades to complement every Indian skin tone, you're ready to turn heads and shine all day. Unstoppable shine? It's yours! Ready to take the spotlight and make it yours forever?</p>
    </div>
    
    <div className="flex justify-between items-center mt-8">
      <div className="text-right">
        <p className="text-sm text-gray-600">Starting from</p>
        <p className="text-2xl font-bold text-gray-800">₹999</p>
      </div>
    </div>
  </div>
</div>





  {/* Newsletter */}
  <section className="py-12 bg-gray-100 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl font-medium text-center tracking-widest">Join the SUGAR Family</h2>
            <p className="mb-6 text-gray-600">Sign up for updates on new launches and exclusive offers</p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-black text-white px-6 py-3 rounded-r">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>





      </main>
      
      
    </div>
  );
};

export default Homepage;