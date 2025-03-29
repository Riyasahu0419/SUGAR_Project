require("dotenv").config()
const express=require("express")
const connection=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const NewRoute=require("./routes/newRoutes")
const FoundationRoute=require("./routes/foundationRoutes")
const LipRoute=require("./routes/lipRouter")
const EyeRoute=require("./routes/eyeRoute")
const NailRoute=require("./routes/nailRoute")
const SkinRoute=require("./routes/skinRoute")
const GiftRoute=require("./routes/giftRoute")
const PlayRoute=require("./routes/playRoute")
const CartRoute=require("./routes/CartRoute")
const auth=require("./middleware/authMiddle")
const server=express()
server.use(express.json())
const cors=require("cors")


server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from Origin: ${req.headers.origin}`);
    next();
  });
  
  server.use(cors({
    origin: (origin, callback) => {
      console.log('Request from origin:', origin); 
      const allowedOrigins = [
        "http://localhost:5173", 
        "https://sugar-project.vercel.app/", 
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Origin ${origin} not allowed by CORS`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  }));
  
  server.options('*', cors());



server.use("/api/cart",CartRoute)
server.use("/api/play",PlayRoute)
server.use("/api/gift",GiftRoute)
server.use("/api/skin",SkinRoute)
server.use("/api/nail",NailRoute)
server.use("/api/eye",EyeRoute)
server.use("/api/lip",LipRoute)
server.use("/api/fp",FoundationRoute)
server.use("/new",NewRoute)
server.use("/auth",authRoutes);

const PORT=process.env.PORT || 5000

server.listen(PORT,async()=>{
    try {
        await connection()
        console.log("server running on port ",PORT)
        
    } catch (error) {
        console.log("server not running on port",error)
    }
})