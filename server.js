const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
const PORT = process.env.PORT || 3000;


// connecting to database

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection
db.on("error", (err) => console.log(err))
db.once("open", () => console.log("connected to DB"))

// middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/leads",  require("./routes/leadRoute"));
app.use("/api/user", require('./routes/authentication'));

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});