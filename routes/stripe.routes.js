const express = require("express");
const Stripe = require("stripe");

require ("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router();

router.post('/create-checkout-session', async  (req, res) => {
    const session = await stripe.checkout.create.session({
        line_items: [
            {
                price_data: {
                    currency: 'EUR',
                    product_data: {
                        name:'',
                    },
                    unit_amount: 2000,
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({url: session.url});
});
module.exports = router;