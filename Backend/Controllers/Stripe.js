const asyncHandler = require("express-async-handler");
const Order=require('../models/Order');
// This is your test secret API key.
const Stripe = require('stripe')
const stripe=Stripe('sk_test_51NbiGiKQ6FXvveZ8hiuXTsdr7J5NR6ZnUUQujC2k0Nl9qStFnVauX9X2O9Q5B3zXhQnOZjCv61HDPYTvpeKDJlx200K8nypiCK');


const HandleStripe= asyncHandler(async(req, res) => {
    const cartItems = req.body.cartItems;
    
    // Extract product IDs from cartItems and store in an array
    const productIDs = cartItems.map(item => item.productID._id);
    const Quantity = cartItems.map(item => item.quantity);
    const customer = await stripe.customers.create({
        metadata: {
          userId: req.body.userID,
          cart: JSON.stringify(productIDs),
          quantities:JSON.stringify(Quantity),
        },
      });
      console.log('Serialized cartItems length:', JSON.stringify(productIDs).length);


    console.log(productIDs);
    
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
    customer: customer.id,
    success_url: `http://localhost:3000/checkout-success`,
    cancel_url: `http://localhost:3000/Cart`,
  });

  res.send({url:session.url});
});

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);
    const Quantities=JSON.parse(customer.metadata.quantities);
    /*const ids = Items.reduce((accumulator, currentItem) => {
        accumulator.push(currentItem.productID._id);
        return accumulator;
    }, []);
    id=ids[0];
    console.log('ids:', ids);
    console.log(id);
    console.log('bde shouf eza 3am yjo mzbout items');*/
    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      productID:Items,
      //CartInfo:id,
      quantity:Quantities,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
  
    try {
      const savedOrder = await newOrder.save();
      console.log("Processed Order:", savedOrder);
    } catch (err) {
      console.log(err);
    }
  };




// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
//endpointSecret= "whsec_f4369b24912b30e93f8062ea3209c549afe6bc6ec01027c3c9ac4729d85727a4";


const handleStripeWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    //const endpointSecret = 'YOUR_WEBHOOK_SECRET'; // Replace with your actual webhook secret
    let data;
    let eventType;
if(endpointSecret){
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Webhook verified');
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  data=event.data.object;
  eventType=event.type;
}
else{
    data=req.body.data.object;
    eventType=req.body.type;
}
    
    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            //console.log(customer);
            //console.log('data:',data);
            try {
              // CREATE ORDER
              createOrder(customer, data);
            } catch (err) {
              console.log(typeof createOrder);
              console.log(err);
            }
          })
        .catch((err) => console.log(err.message));
      }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  };



module.exports = { HandleStripe,handleStripeWebhook };