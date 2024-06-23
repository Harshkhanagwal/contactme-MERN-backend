const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const home = async (req, res) => {
    try {
        res.status(200).send({ msg: "Auth - API for ContactMe website developed by Harsh khanagwal" });
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ msg: "Email Already Exists" })
        }

        const createdUser = await User.create({ username, email, password })
        
        res.status(201).json({
            msg: `Account created with email : ${email}`,
            token: await createdUser.gereateToken(),
            userId: createdUser._id.toString()
        });
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const user = await userExist.comparePassword(password)

        if (user) {
            res.status(201).json({
                msg: `Login Successful`,
                token: await userExist.gereateToken(),
                userId: userExist._id.toString()
            });
        }else{
            res.status(400).json({error: "Invalid Password"})
        }

    } catch (error) {
        res.status(404).json({ error : "Invalid Credentials" })
    }
}


const user = async (req, res) => {
    try {
        const userData = req.user;
       return res.status(200).json(userData)
    } catch (error) {
        return res.status(400).json({error: "Internal server Error"})
    }
}
module.exports = { home, register, login, user };
