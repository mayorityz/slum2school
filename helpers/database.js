import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

var DB_POOL = process.env.NODE_ENV
  ? "mongodb+srv://slum2school:8RAYaeW9NqOT6dht@cluster0.fncpb.mongodb.net/db?retryWrites=true&w=majority"
  : process.env.MONGODBURL;

let connection;

try {
  connection = mongoose.connect(DB_POOL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

export default connection;
