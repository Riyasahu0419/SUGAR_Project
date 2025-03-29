import React from 'react'
import { Link } from 'react-router-dom'

function Offer() {
   const imageRoutes = [
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/CDF-_-MAH-Mini-offer-OP-600x450_2.jpg?v=1743145764",
       alt: "Lipstic",
       route: "/FP"
     },
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/LA-LA-Love-Free-gift-HP2-600x500_2.jpg?v=1738663330",
       alt: "Lipstick",
       route: "/lip"
     },
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/Manicure-Kit-Offer-OP-Banner-600-X-450_1.jpg?v=1742539860",
       alt: "Nail",
       route: "/nail"
     },
     
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/Buy-2-Get-1_2025-HP-600x500.gif?v=1742570231",
       alt: "Beauty kit",
       route: "/eye"
     },
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/Teal-Trousseau-OP-600x450.jpg?v=1743138056",
       alt: "Lipbalm",
       route: "/FP"
     },
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/Shehnaaz-Trousseau-Box-GWP_HP-Banners_600-X-500_Final_1.jpg?v=1742215488",
       alt: "skinproduct",
       route: "/skin"
     },
    
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/OP-600x450_1_cccb4e17-29b6-4734-afef-37c8e26a245e.jpg?v=1738256511",
       alt: "foundation",
       route: "/FP"
     },
     {
       src: "https://cdn.shopify.com/s/files/1/0906/2558/files/image_45.png?v=1738137218",
       alt: "eyeshadow",
       route: "/eye"
     }
   ];

   return (
     <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-30">
       <h1 className='text-3xl tracking-widest text-black mb-4 font-mono '>OFFER</h1>
       <div className="grid grid-cols-1 gap-4 max-w-6xl">
         {imageRoutes.map((image, index) => (
           <Link 
             key={index} 
             to={image.route} 
             className="block hover:opacity-80 transition-opacity"
           >
             <img 
               src={image.src} 
               alt={image.alt} 
               className="w-full h-auto object-cover rounded-lg shadow-md"
             />
           </Link>
         ))}
       </div>
     </div>
   )
}

export default Offer