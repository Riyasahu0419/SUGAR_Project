require("dotenv").config()
const express=require("express")
const connection=require("./config/db")
const authRoutes=require("./routes/authRoutes")
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
        // "https://recipe-application-delta.vercel.app", 
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




server.use("/api",authRoutes);

const PORT=process.env.PORT || 5000

server.listen(PORT,async()=>{
    try {
        await connection()
        console.log("server rinning on port ",PORT)
        
    } catch (error) {
        console.log("server not running on port",error)
    }
})