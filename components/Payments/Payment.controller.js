import PaymentModel from "./Payment.model.js";
import { init, validate } from "./../../payments/Paystack.js";
import { v4 as uuidv4 } from "uuid";

var origin = process.env.NODE_ENV
  ? "https://slum2school.org/"
  : "http://localhost:3000";

export const initializePayment = async (req, res) => {
  let id = uuidv4();
  const { duration, amount, isMembership, firstname, lastname, email, zip } =
    req.body;

  let response = await init({
    duration,
    amount: amount * 100,
    isMembership,
    firstname,
    lastname,
    email,
    zip,
    reference: id,
  });

  res.status(200).json(response);
};

export const verify = async (req, res) => {
  const trxref = req.query.reference;
  let response = await validate(trxref);
  if (response.status) {
    let metadata = response.data.metadata;
    let channel = response.data.channel;
    let bank = response.data.authorization.bank;
    let card = response.data.authorization.card_type;
    console.log("meta data :", metadata);
    // save record to dB.
    try {
      let save = new PaymentModel({
        ...metadata,
      });
      let status = await save.save();
      console.log(status);
      res.redirect(origin);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(200).send(response.message);
  }
};

export const history = async (req, res) => {
  PaymentModel.find({}, (err, result) => {
    if (err) res.status(200).json({ status: false, message: err });
    else res.status(200).json({ status: true, message: result });
  });
};
