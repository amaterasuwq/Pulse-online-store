const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51Qcu9aLATpl2XaIVlWYG4odTcKbIyRnjSsLwthJVx2dC0hNvINlKHgCv3flrZnJfaH5tvFqLl1fZT24dR30racgX00ZORdfb1F');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/checkout', async (req, res) => {
    try {
        const { line_items } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal'],
            line_items: line_items,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'PL']
            },
            success_url: `http://localhost:3001/confirmation`,
            cancel_url: `http://localhost:3001/order`
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.get('/complete', async (req, res) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ]);

    console.log(JSON.stringify(await result));

    res.send('Your payment was successful');
});

app.get('/cancel', (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => console.log('Server started on port 3000'));

