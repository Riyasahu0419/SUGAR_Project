import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Home"
import Navbar from "./Navbar"

function AllRoutes(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>

        </Routes>
       
        
        </>
    )
}

export default AllRoutes