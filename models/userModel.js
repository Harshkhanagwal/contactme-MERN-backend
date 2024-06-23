const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(5);
        const hash_password = await bcrypt.hash(user.password, saltRound);

        user.password = hash_password;

    } catch (err) {
        next(err)
    }
})

// compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

//JSON web Token
userSchema.methods.gereateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_KEY,
            {
                expiresIn: "30d"
            }
        )
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
