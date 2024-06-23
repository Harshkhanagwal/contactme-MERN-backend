const {z} = require('zod')

//creating an object schema

const registerSchema = z.object({
    username : z.string({required_error:"Name is required"}).trim().min(3, {message:"Name must be at least 3 characters"}).max(50, {message:"Name must not be more than 50 characters"}),
    email : z.string({required_error:"Email is required"}).trim(),
    password : z.string({required_error:"Email is required"}).trim().min(7, {message:"Password must have at least 7 characters"}).max(50, {message:"Your password length should be smaller than 50"}),
})

module.exports = registerSchema