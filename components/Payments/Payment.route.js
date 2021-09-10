import express from "express";
import { initializePayment, verify, history } from "./Payment.controller.js";

const Route = express.Router();

Route.post("/paystack/init", initializePayment);
Route.get("/paystack/verify", verify);
Route.get("/paystack/history", history);

export default Route;
