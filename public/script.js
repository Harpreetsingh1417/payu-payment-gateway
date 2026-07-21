const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const paymentData = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        amount: document.getElementById("amount").value.trim(),

        currency: document.getElementById("currency").value

    };

    const response = await fetch("/payment", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(paymentData)

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    const payuForm = document.createElement("form");

    payuForm.method = "POST";

    payuForm.action = result.paymentData.action;

    for (const key in result.paymentData) {

        if (key === "action") continue;

        const input = document.createElement("input");

        input.type = "hidden";

        input.name = key;

        input.value = result.paymentData[key];

        payuForm.appendChild(input);

    }

    document.body.appendChild(payuForm);

    payuForm.submit();

});