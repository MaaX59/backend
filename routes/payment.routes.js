const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItem.map((item) => {
    return {
      price_data: {
        currency: "EUR",
        product_data: {
          name: product.name,
          images: [product.images],
          description: product.description,
          metadata: {
            id: product.id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.cartQuantity,
    };
  });
  const session = await stripe.checkout.create.session({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
});
module.exports = router;
