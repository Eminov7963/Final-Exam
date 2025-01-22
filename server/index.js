const express = require("express");
const app = express();
const mongoose  = require("mongoose")
const cors = require("cors")
app.use(cors())
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())
const ProductRouter = require("./routers/productRouters")


app.use("/products",ProductRouter)
app.get("/", (req, res) => {
  res.send("Emin's Site");
});


const DATA_URL = "mongodb+srv://eminovemin199:eminovemin199@eminfullstack-project.mbhs8.mongodb.net/fullStack-practica?retryWrites=true&w=majority&appName=EminFullStack-Project";
const port = 8080;




mongoose
  .connect(DATA_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
    console.log("Connected!")});