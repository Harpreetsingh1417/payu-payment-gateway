const {
    generateTransactionId,
    generateHash
} = require("../utils/payuHash");

const processPayment = (req, res) => {

    const {
        name,
        email,
        phone,
        amount,
        currency
    } = req.body;

    if (
        !name ||
        !email ||
        !phone ||
        !amount ||
        !currency
    ) {

        return res.status(400).json({

            success: false,

            message: "Please fill all required fields."

        });

    }

    const txnid = generateTransactionId();

    const productinfo = "Website Payment";

    const paymentData = {

        action: process.env.PAYU_BASE_URL,

        key: process.env.PAYU_MERCHANT_KEY,

        txnid,

        amount,

        productinfo,

        firstname: name,

        email,

        phone,

        surl: process.env.SUCCESS_URL,

        furl: process.env.FAILURE_URL,

        hash: generateHash({

            key: process.env.PAYU_MERCHANT_KEY,

            txnid,

            amount,

            productinfo,

            firstname: name,

            email,

            salt: process.env.PAYU_MERCHANT_SALT

        })

    };

    return res.json({

        success: true,

        paymentData

    });

};

module.exports = {

    processPayment

};