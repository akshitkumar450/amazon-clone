/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const key = "sk_test_51ImcUYLSnLgEhz6V65zgcgb0hXLBZQWTc6SE4gWQgXR1oEDHve2FDfugdYiJ3BvZjX1nOTUVKhSNC73OS64FGVM000zWyEM36L";
const stripe = require("stripe")(key);

// api

// app config
const app = express();

// app middleware
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get("/", (req, res) => {
    res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    // console.log('payment recieved', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //subunits of the currency
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// listerner
exports.api = functions.https.onRequest(app);

// ```
// to run backend server
// firebase emulators:start

// our backend running on->
// http://localhost:5001/clone-5e57f/us-central1/api
