const asyncHandler = require("express-async-handler");
// This is your test secret API key.
const Stripe = require('stripe')
const stripe=Stripe('sk_test_51NbiGiKQ6FXvveZ8hiuXTsdr7J5NR6ZnUUQujC2k0Nl9qStFnVauX9X2O9Q5B3zXhQnOZjCv61HDPYTvpeKDJlx200K8nypiCK');


const HandleStripe= asyncHandler(async(req, res) => {
    console.log(req.body.cartItems);
    console.log('hello hassan');
    const line_items = req.body.cartItems.map((item) => {
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productID.name,
              images: [item.productID.image],
              description: item.productID.description,
              metadata: {
                id: item.productID.id,
              },
            },
            unit_amount: item.productID.price * 100,
          },
          quantity: item.quantity,
        };
      });
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/checkout-success`,
    cancel_url: `http://localhost:3000/Cart`,
  });

  res.send({url:session.url});
});

module.exports = { HandleStripe };