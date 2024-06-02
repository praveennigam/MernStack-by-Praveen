import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);


//connect frontend to backend


import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// app config database
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());


// db connection
connectDB();

//static files
app.use(express.static(path.join(__dirname, "./admin/dist")));
app.use(express.static(path.join(__dirname, "./frontend/dist")));



app.get("*", function(req, res) {

    res.sendFile(path.join(__dirname, "./admin/dist/index.html"));
})
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
})








// api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);




app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});