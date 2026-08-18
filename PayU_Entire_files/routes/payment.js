const express = require("express");

const router = express.Router();

const {
    processPayment
} = require("../controllers/paymentController");


// TEST ROUTE
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Payment route is working"
    });
});


// PAYMENT ROUTE
router.post("/", processPayment);


// SUCCESS ROUTE
router.post("/success", (req, res) => {

    console.log("SUCCESS");
    console.log(req.body);

    res.send("<h1>Payment Successful</h1>");

});


// FAILURE ROUTE
router.post("/failure", (req, res) => {

    console.log("FAILED");
    console.log(req.body);

    res.send("<h1>Payment Failed</h1>");

});


module.exports = router;
