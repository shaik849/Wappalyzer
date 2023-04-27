const express = require('express')
const app = express();
const fileUplod = require('express-fileupload')
const base64 = require('node-base64-image');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const env = require('dotenv').config();
const router = require('./Router/wappalyzerRouter')
const dnsRouter = require('./Router/dnsRouter')
const managedRouter = require('./Router/manageRouter')
const sitemap = require('./Router/sitemapRouter')
app.use(express.static('public'))

app.use(fileUplod({
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"));
app.use("/api",router)
app.use("/api", dnsRouter)
app.use("/api", managedRouter)
app.use("/api", sitemap)


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