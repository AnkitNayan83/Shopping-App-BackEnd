const router = require("express").Router();

const KEY = process.env.STRIPE_SEC;

const stripe = require("stripe")(KEY);

router.post("/payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create(
    {
      source: req.params.tokenId,
      amount: req.body.amount,
      currency: "inr",
      payment_method_types: ["card"],
      payment_method: "pm_card_visa",
      confirm: true,
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
