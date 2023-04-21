const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const env = require('dotenv').config();
const router = require('./Router/wappalyzerRouter')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"));
app.use("/api",router)

const url = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/Wappzlyzer`;

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connected.....");
      });


app.listen(process.env.PORT, ()=>{
    console.log('listening on port 3000')
})