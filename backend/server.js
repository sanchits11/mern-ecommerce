// npm init -y in main folder


// wrote "type" : "module" for line 5
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import { connectDB } from "./lib/db.js";

//to initialize env here
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;

app.use(express.json( {limit: "10mb" })); //allows you to parse the body of the req
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("api/coupons",couponRoutes)
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);


app.listen(PORT, () =>{
    console.log("Server is listening on http://localhost:" + PORT);
    connectDB();
})

//Q11odjhHa9yUnIup