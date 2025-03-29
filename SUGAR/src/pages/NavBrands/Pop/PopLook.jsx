

const PopLooks = () => {
 

  const lookCards = [
    {
      id: 1,
     
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/Date-Night-Look-Kit-Tile-Banner-new-ezgif.com-optimize_1.gif?v=1734954933&width=600'
    },
    {
      id: 2,
      
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/No-Makeup-Makeup-Kit-Tile-Banner-600x400_3_1.gif?v=1734954933&width=600'
    },
    {
      
      image: 'https://www.sugarcosmetics.com/cdn/shop/files/EyePOPin-Makeup-Look-Tile-Banner-600x400-3_2.gif?v=1734954934&width=600'
    }
  ];

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-center tracking-widest">SHOP THE LOOKS</h1>
      </div>
      
      {/* Look Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {lookCards.map(card => (
          
            <div className="p-4">
              
              
              <div className="flex flex-col md:flex-row gap-4">
                
                
                {/* Model image side */}
                <div className="flex-1 relative">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    
                  />
                
                </div>
              </div>
              
             
            </div>
       
        ))}
      </div>
      
     
    </div>
  );
};

export default PopLooks;