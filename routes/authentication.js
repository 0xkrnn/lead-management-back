const router = require("express").Router()
const authModel = require("../model/userAuth")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { handleLogin, handleRegister } = require("../controllers/authController")

const customHeader = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "https://lead-mangement.netlify.app");
    next()
}

router
    .post("/register",customHeader, handleRegister)

    .post("/login", handleLogin)


module.exports = router;