require("dotenv").config()
const express = require('express')
const authrouter = require('./Router/auth-router');
const contactrouter = require('./Router/contact-router');
const adminrouter = require('./Router/Admin-router')
const connectDb = require('./utils/db');
const cors = require('cors')
const app = express();

const frontEnd_url = process.env.FRONTEND_URL 
const corsOptions = {
    origin : frontEnd_url,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/auth", authrouter);
app.use("/api/contact", contactrouter);
app.use("/api/admin", adminrouter);

const PORT = process.env.PORT || 3000;

connectDb().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is Running on PORT : ${PORT}`)
    })
})