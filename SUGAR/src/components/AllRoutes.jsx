import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Home"
import Navbar from "./Navbar"
import AddCart from "../pages/AddCart";

function AllRoutes(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/cart" element={<AddCart/>}/>

        </Routes>
       
        
        </>
    )
}

export default AllRoutes