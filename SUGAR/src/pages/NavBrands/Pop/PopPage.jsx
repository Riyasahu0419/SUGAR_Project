
import PopHead from './PopHeader';
import PopLaunches from './PopNewLaunch';
import PopLooks from './PopLook';


const Pop = () => {
  


  return (
    <div className="min-h-screen ">
      
      <main>
      {/* Main Content caorceItem */}
      <PopHead/>
        
     {/* NewLaunches content */}

      <PopLaunches/>

      {/* Pop Looks */}

      <PopLooks/>

  {/*   insta clips vedios */}
      <section>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-center tracking-widest mt-14">LOVE YOUR SKIN</h1>
      </div>
      <img src="https://www.sugarcosmetics.com/cdn/shop/files/5f7f0261-3106-462a-808b-c2f0310771eb.jpg?v=1734959563&width=1800" alt="" 
      className='mt-14'
      />
      </section>

      <div className="text-center mb-14 mt-14">
        <h1 className="text-2xl font-medium text-center tracking-widest">SUGAR POP CLAIMS</h1>
      </div>


      </main>   
    </div>
  );
};

export default Pop;