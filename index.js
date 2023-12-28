/* dependencies */
require("dotenv").config(); // environment variables setup
const express = require('express')
const app = express()
const path = require('path')
const fs = require("fs");
const logger = require('morgan')
const helmet = require("helmet");
const port =  process.env.PORT || 5000
// application logging service
const { logError } = require("./services/logging/index");

/* routes */
const userRoutes = require('./routes/users.route')

/* server settings */
app.use(express.static(path.join(__dirname, "public"))); // static server
app.use(express.urlencoded({
    extended: true,
})); // payload extension
app.use(express.json()); // payload parser
app.use(logger("dev")); // http logger
app.use(helmet()); // obscure server details

/* create the logs folder */
if (!fs.existsSync("logs")) {
	fs.mkdirSync("logs");
}
if (!fs.existsSync("logs/error")) {
	fs.mkdirSync("logs/error");
}
if (!fs.existsSync("logs/info")) {
	fs.mkdirSync("logs/info");
}
if (!fs.existsSync("logs/warn")) {
	fs.mkdirSync("logs/warn");
}
if (!fs.existsSync("logs/debug")) {
	fs.mkdirSync("logs/debug");
}
if (!fs.existsSync("logs/verbose")) {
	fs.mkdirSync("logs/verbose");
}
if (!fs.existsSync("logs/silly")) {
	fs.mkdirSync("logs/silly");
}

/* headers */
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS");
	next();
});

/* default route (root) */
app.get("/", (req, res) => {
	res.json({
		message: "Styava Devs API Server",
	});
});

app.get('/error', (req, res) => {
    try {
        throw new Error("Intentional error duhhh!");
    }
    catch (err) {
        logError(err)
        res.json({"message": "Intentional error duhhh"})
    }
})

/* application server routers */
app.use("/api/users", userRoutes) // users router

/* catch all routes */
app.use("*", (err, req, res, next) => {
	console.log(err);
	logError(err)
	res.json({"message": "Lost in the matrix?"});
});

/* server configurations */
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
