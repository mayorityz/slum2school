import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

var DB_POOL = process.env.NODE_ENV
  ? "mongodb+srv://slum2school:slumslum123@@cluster0.fncpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  : process.env.MONGODBURL;

let connection;
console.log(DB_POOL);
try {
  connection = mongoose.connect(DB_POOL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

export default connection;
