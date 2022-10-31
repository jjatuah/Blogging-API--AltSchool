const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require('dotenv').config();
const app = express()

const blogRoute = require("./routes/blog.route")

const PORT = 7500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/blog", blogRoute);

app.get('/', (req, res) => {
    res.send("Login or signup to make an order")
})


mongoose.connect('mongodb://localhost:27017')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

module.exports = app;