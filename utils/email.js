const express = require("express");

const router = express.Router();

const emailHelper = require("../utils/email");
const {
    processPayment
} = require("../controllers/paymentController");

const getCallbackData = (req) => {
    const payload = {
        ...(req.query || {}),
        ...(req.body || {})
    };

    return {
        firstname: payload.firstname || payload.name || "Customer",
        name: payload.name || payload.firstname || "Customer",
        email: payload.email || "",
        phone: payload.phone || "",
        amount: payload.amount || payload.net_amount_debit || "",
        txnid: payload.txnid || payload.transaction_id || ""
    };
};

router.post("/", processPayment);

router.all("/success", async (req, res) => {

    console.log("SUCCESS");

    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);
    console.log("QUERY:", req.query);

    try {
        const {
            firstname,
            name,
            email,
            amount,
            txnid
        } = getCallbackData(req);

        if (email) {
            await emailHelper.sendPaymentSuccessEmail(firstname || name || "Customer", email, amount || "", txnid || "");
        }
    } catch (error) {
        console.error("EMAIL SEND FAILED:", error);
    }

    res.status(200).send("<h1>Payment Successful</h1>");

});

router.all("/failure", async (req, res) => {

    console.log("FAILED");

    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);
    console.log("QUERY:", req.query);

    try {
        const {
            firstname,
            name,
            email,
            amount,
            txnid
        } = getCallbackData(req);

        if (email) {
            await emailHelper.sendPaymentSuccessEmail(firstname || name || "Customer", email, amount || "", txnid || "");
        }
    } catch (error) {
        console.error("EMAIL SEND FAILED:", error);
    }

    res.status(200).send("<h1>Payment Failed</h1>");

});

module.exports = router;