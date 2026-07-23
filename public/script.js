// ============================================
// GET HTML ELEMENTS
// ============================================


// Payment Form

const paymentForm =
    document.getElementById(
        "paymentForm"
    );


// Currency Dropdown

const currencySelect =
    document.getElementById(
        "currency"
    );


// Currency Symbol

const currencySymbol =
    document.getElementById(
        "currencySymbol"
    );


// Pay Button

const payButton =
    document.getElementById(
        "payButton"
    );



// ============================================
// CURRENCY SYMBOL CHANGE
// ============================================


currencySelect.addEventListener(
    "change",
    () => {


        // Get selected currency

        const selectedCurrency =
            currencySelect.value;


        // If USD is selected

        if (
            selectedCurrency === "USD"
        ) {

            currencySymbol.textContent =
                "$";

        }


        // If INR is selected

        else {

            currencySymbol.textContent =
                "₹";

        }

    }
);



// ============================================
// PAYMENT FORM SUBMISSION
// ============================================


paymentForm.addEventListener(
    "submit",
    async (event) => {


        // Stop normal form submission

        event.preventDefault();


        // Disable button
        // to prevent multiple clicks

        payButton.disabled =
            true;


        payButton.textContent =
            "Processing...";



        // ============================================
        // COLLECT FORM DATA
        // ============================================


        const paymentData = {


            // Customer Name

            name:
                document
                    .getElementById("name")
                    .value
                    .trim(),


            // Customer Email

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),


            // Customer Phone

            phone:
                document
                    .getElementById("phone")
                    .value
                    .trim(),


            // Payment Amount

            amount:
                document
                    .getElementById("amount")
                    .value
                    .trim(),


            // Selected Currency

            currency:
                document
                    .getElementById("currency")
                    .value

        };



        // ============================================
        // SEND DATA TO NODE.JS BACKEND
        // ============================================


        try {


            const response =
                await fetch(
                    "/payment",
                    {

                        method: "POST",


                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        body:
                            JSON.stringify(
                                paymentData
                            )

                    }
                );



            // Convert backend response
            // into JavaScript object

            const result =
                await response.json();



            // ============================================
            // CHECK BACKEND RESPONSE
            // ============================================


            if (
                !result.success
            ) {

                alert(
                    result.message
                );


                // Restore button

                payButton.disabled =
                    false;


                payButton.textContent =
                    "Pay Securely";


                return;

            }



            // ============================================
            // DISPLAY CONVERSION INFORMATION
            // ============================================


            console.log(
                "Original Amount:",
                result.originalAmount,
                result.originalCurrency
            );


            console.log(
                "Converted INR Amount:",
                result.convertedAmount,
                "INR"
            );



            // ============================================
            // CREATE PAYU FORM
            // ============================================


            const payuForm =
                document.createElement(
                    "form"
                );



            // PayU requires POST

            payuForm.method =
                "POST";



            // Get PayU URL

            payuForm.action =
                result
                    .paymentData
                    .action;



            // ============================================
            // ADD PAYU PAYMENT FIELDS
            // ============================================


            for (
                const key
                in result.paymentData
            ) {


                // Don't create an input
                // for the action URL

                if (
                    key === "action"
                ) {

                    continue;

                }



                // Create hidden input

                const input =
                    document.createElement(
                        "input"
                    );



                // Hidden input

                input.type =
                    "hidden";



                // PayU field name

                input.name =
                    key;



                // PayU field value

                input.value =
                    result
                        .paymentData[key];



                // Add input to form

                payuForm.appendChild(
                    input
                );

            }



            // ============================================
            // SUBMIT PAYMENT TO PAYU
            // ============================================


            // Add form to page

            document.body.appendChild(
                payuForm
            );


            // Submit form automatically

            payuForm.submit();


        }


        // ============================================
        // ERROR HANDLING
        // ============================================


        catch (error) {


            console.error(
                "Payment error:",
                error
            );


            alert(
                "Unable to connect to the payment server."
            );


            // Restore button

            payButton.disabled =
                false;


            payButton.textContent =
                "Pay Securely";

        }

    }
);