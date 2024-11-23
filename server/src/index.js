import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`server running at: http://localhost:4000`)
    })
}).catch((error) => {
    console.log("MongoDB connection failed !!" , error)
});