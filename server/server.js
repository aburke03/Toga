const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//stripe test secret key (current key rolled, generate new key in future for intended use)
const stripe = require("stripe")(
  process.env.STRIPE_TEST_SECRET_KEY
);

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));

app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running' });
});

app.post('/payment-sheet', async (req, res) => {
  console.log('Payment-sheet endpoint hit at:', new Date().toISOString());
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  try {
    const amount = req.body.amount;
    console.log('Amount:', amount);
    
    const customer = await stripe.customers.create();
    console.log('Customer created:', customer.id);
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );
    console.log('Ephemeral key created');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log('Payment intent created');

    const response = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY,
    };
    
    console.log('Sending response');
    res.json(response);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});