import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    memberType: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    paymentPlatform: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model("payments", paymentSchema);

export default Payments;
