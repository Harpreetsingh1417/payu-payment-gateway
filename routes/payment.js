const express = require("express");

const router = express.Router();

const {
    processPayment
} = require("../controllers/paymentController");

router.post("/", processPayment);

router.post("/success", (req, res) => {

    console.log("SUCCESS");

    console.log(req.body);

    res.send("<h1>Payment Successful</h1>");

});

router.post("/failure", (req, res) => {

    console.log("FAILED");

    console.log(req.body);

    res.send("<h1>Payment Failed</h1>");

});

module.exports = router;