import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

var DB_POOL = process.env.NODE_ENV
  ? process.env.REMOTE_DB
  : process.env.MONGODBURL;

let connection;

try {
  connection = mongoose.connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

export default connection;
