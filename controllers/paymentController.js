const {
    generateTransactionId,
    generateHash
} = require("../utils/payuHash");


// Currency Conversion Function
const convertCurrency = async (amount, currency) => {

    // If currency is already INR,
    // no conversion is required
    if (currency === "INR") {
        return Number(amount);
    }

    // If currency is USD,
    // convert USD to INR
    if (currency === "USD") {

        try {

            // Call ExchangeRate API
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${currency}`
            );

            // Check if API request was successful
            if (!response.ok) {

                throw new Error(
                    `Currency API returned status ${response.status}`
                );

            }

            // Convert API response into JavaScript object
            const data = await response.json();

            // Get USD to INR exchange rate
            const rate = data.rates.INR;

            // Check if INR rate exists
            if (!rate) {

                throw new Error(
                    "INR exchange rate was not found."
                );

            }

            // Convert USD amount into INR
            const convertedAmount =
                Number(amount) * Number(rate);

            // Return amount rounded to 2 decimal places
            return Number(convertedAmount.toFixed(2));

        } catch (error) {

            console.error(
                "Currency conversion error:",
                error.message
            );

            throw new Error(
                "Unable to convert currency at the moment."
            );

        }

    }

    // Reject unsupported currencies
    throw new Error(
        "Unsupported currency selected."
    );

};


// Process Payment
const processPayment = async (req, res) => {

    try {

        // Get data sent by frontend
        const {
            name,
            email,
            phone,
            amount,
            currency
        } = req.body;


        // Check for missing fields
        if (
            !name ||
            !email ||
            !phone ||
            !amount ||
            !currency
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all required fields."

            });

        }


        // Convert amount into a number
        const numericAmount = Number(amount);


        // Check whether amount is a valid number
        if (
            Number.isNaN(numericAmount) ||
            numericAmount <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid payment amount."

            });

        }


        // Convert the user's amount into INR
        const convertedAmount =
            await convertCurrency(
                numericAmount,
                currency
            );


        console.log(
            "==================================="
        );

        console.log(
            "Original Amount:",
            numericAmount,
            currency
        );

        console.log(
            "Converted INR Amount:",
            convertedAmount,
            "INR"
        );

        console.log(
            "==================================="
        );


        // Generate unique transaction ID
        const txnid =
            generateTransactionId();


        // Product information
        const productinfo =
            "Website Payment";


        // PayU Payment Data
        const paymentData = {

            // PayU Sandbox URL
            action:
                process.env.PAYU_BASE_URL,

            // Merchant Key
            key:
                process.env.PAYU_MERCHANT_KEY,

            // Unique transaction ID
            txnid,

            // IMPORTANT:
            // PayU receives the converted INR amount
            amount:
                convertedAmount,

            // Product information
            productinfo,

            // Customer name
            firstname:
                name,

            // Customer email
            email,

            // Customer phone
            phone,

            // Success URL
            surl:
                process.env.SUCCESS_URL,

            // Failure URL
            furl:
                process.env.FAILURE_URL,


            // Generate PayU SHA-512 hash
            hash:
                generateHash({

                    key:
                        process.env.PAYU_MERCHANT_KEY,

                    txnid,

                    // IMPORTANT:
                    // Hash uses the SAME INR amount
                    // that is sent to PayU
                    amount:
                        convertedAmount,

                    productinfo,

                    firstname:
                        name,

                    email,

                    salt:
                        process.env.PAYU_MERCHANT_SALT

                })

        };


        // Send response back to frontend
        return res.json({

            success: true,

            // Original amount entered by user
            originalAmount:
                numericAmount,

            // Original currency
            originalCurrency:
                currency,

            // Final INR amount sent to PayU
            convertedAmount,

            // PayU payment data
            paymentData

        });


    } catch (error) {

        console.error(
            "Payment processing error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to process payment."

        });

    }

};


module.exports = {

    processPayment

};