import express from "express";
import cors from "cors";
import DATABASE from "./helpers/database.js";

import PaymentRoute from "./components/Payments/Payment.route.js";

const app = express();
const Port = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(PaymentRoute);

app.use("/", (req, res, next) => {
  res.send("home page");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// server
DATABASE.then(() => {
  console.log("db is connected");
  app.listen(Port, () => {
    console.log(`running on port:${Port}`);
  });
}).catch((err) => {
  console.log(err);
});
