const Contact = require("../models/contactModel")

const contactController = async (req, res) => {
    try {
        const data = req.body
        await Contact.create(data)
        res.status(200).send({ msg: "Message Send Successfully" });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};


module.exports = contactController