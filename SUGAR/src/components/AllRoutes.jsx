import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Home"
import Navbar from "./Navbar"
import AddCart from "../pages/AddCart";
import NewProduct from "../pages/NavBrands/New";
import Foundation from "../pages/NavBrands/Foundation";
import Lip from "../pages/NavBrands/Lip";
import EyeProduct from "../pages/NavBrands/Eye";
import Nail from "../pages/NavBrands/Nail";
import Skin from "../pages/NavBrands/Skin";
import Offer from "../pages/NavBrands/Offer";
import Gift from "../pages/NavBrands/Gift";
import Play from "../pages/NavBrands/Play";
import Pop from "../pages/NavBrands/Pop/PopPage";
import Checkout from "../pages/CheckOut";

function AllRoutes(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/cart" element={<AddCart/>}/>
            <Route path="/new" element={<NewProduct/>}/>
            <Route path="/FP" element={<Foundation/>}/>
            <Route path="/lip" element={<Lip/>}/>
            <Route path="/eye" element={<EyeProduct/>}/>
            <Route path="/nail" element={<Nail/>}/>
            <Route path="/skin" element={<Skin/>}/>
            <Route path="/offers" element={<Offer/>}/>
            <Route path="/gift" element={<Gift/>}/>
            <Route path="/sugar-pop" element={<Pop/>}/>
            <Route path="/play" element={<Play/>}/>
            <Route path="/checkout" element={<Checkout/>}/>

        </Routes>
       
        
        </>
    )
}

export default AllRoutes