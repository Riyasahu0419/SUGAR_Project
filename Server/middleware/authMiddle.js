const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) {
        return res.status(401).json({error:"Unauthorized"});

    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SCRETE);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports=auth;