const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
require('dotenv').config();

app.use(express.json());

const connect = require('./db_connect');
connect();



app.use('/user', require("./routes/user"));

app.get("/", (req, res) => res.send("Working"));


app.listen(process.env.PORT, () => {console.log("connected to " + process.env.PORT);})