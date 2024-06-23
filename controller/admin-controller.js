const User = require('../models/userModel')
const Contact = require('../models/contactModel')

const getallusers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });

        if (!users || users.length === 0) {
            return res.status(400).json({ message: "No users Found" });
        }

        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllcontact = async (req, res) => {
    try {
        const contact = await Contact.find();

        if (!contact || contact.length === 0) {
            return res.status(400).json({ message: "No Message Found" });
        }

        return res.status(200).json(contact)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.deleteOne({ _id: id });
        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error });
    }
};

const deletecontact = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Contact.deleteOne({ _id: id });
        res.status(200).json({ message: "Message Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error });
    }
}

const updateuser = async (req, res) => {
    try {
        const updatedUserData = req.body;
        const user = await User.findById({_id:updatedUserData._id})

        const result = await User.findByIdAndUpdate(user._id, { $set: updatedUserData }, { new: true });

        if (result) {
            return res.json({ message: 'User updated successfully', data: result });
        } else {
            return res.status(404).json({ error: 'User not found or update failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating user' });
    }
};


module.exports = { getallusers, getAllcontact, deleteuser, updateuser, deletecontact }