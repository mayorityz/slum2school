import Paystack from "paystack";
let Py = Paystack("sk_test_ee1c6c61e1b3b60fec9f3f5c3b321c6e49fdfee7");

export const init = async ({
  amount,
  reference,
  firstname,
  lastname,
  email,
  isMembership,
  duration,
  zip,
}) => {
  var origin = process.env.NODE_ENV
    ? "https://slum2school.herokuapp.com/paystack/verify"
    : "http://localhost:4500/paystack/verify";

  try {
    let res = await Py.transaction.initialize({
      amount,
      reference,
      email,
      metadata: {
        amount,
        email,
        duration,
        zip,
        paymentId: reference,
        memberType: isMembership,
        firstName: firstname,
        lastName: lastname,
        paymentPlatform: "paystack",
      },
      callback_url: origin,
    });

    return res;
  } catch (error) {
    return error.message;
  }
};

export const validate = async (reference) => {
  console.log("verifying");
  try {
    let res = await Py.transaction.verify(reference);
    return res;
  } catch (error) {
    return error;
  }
};
