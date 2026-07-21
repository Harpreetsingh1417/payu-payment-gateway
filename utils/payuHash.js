const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const generateTransactionId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 28);
};

const generateHash = ({
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    salt
}) => {

    const hashString =
        `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

    return crypto
        .createHash("sha512")
        .update(hashString)
        .digest("hex");
};

module.exports = {
    generateTransactionId,
    generateHash
};