import express from "express";
import mongoose from "mongoose";
import PORT from "./config/server.config.js";
import DB_URL from "./config/db.config.js";
import {router} from "./routes/routes.js";

const app = express();

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("error" , ()=>{
    console.log('Error while connecting to the mongoDB')
});

db.once("open", ()=>{
    console.log("Connected to MongoDB");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
