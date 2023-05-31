const express = require('express')
const app = express();
const fileUplod = require('express-fileupload')
const bodyParser = require('body-parser')
const base64 = require('node-base64-image');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
const env = require('dotenv').config();

app.use(fileUplod({
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

const router = require('./Router/wappalyzerRouter')
const dnsRouter = require('./Router/dnsRouter')
const managedRouter = require('./Router/manageRouter')
const sitemap = require('./Router/sitemapRouter')
const csvRouter = require('./Router/csvRouter')
const levelRouter = require('./Router/levelRouter')
const visualRouter = require('./Router/visualRouter')
const pageauditRouter = require('./Router/pageauditRouter')
const screenshortRouter = require('./Router/screenshortRouter')
const dynamicRouter = require('./Router/dynamicDataRouter')
const validationRouter = require('./Router/validationRouter')
const websiteRouter = require('./Router/websiteRouter')
const vocherRouter = require('./Router/vochereRouter')
app.use(express.static('public'))


app.use(morgan("dev"));
app.use(cors())
app.use("/api",router)
app.use("/api", pageauditRouter)
app.use("/api", dnsRouter)
app.use("/api", managedRouter)
app.use("/api", sitemap)
app.use("/api", csvRouter)
app.use("/api", levelRouter)
app.use("/api", visualRouter)
app.use("/api", screenshortRouter)
app.use("/api", dynamicRouter)
app.use("/api", validationRouter)
app.use("/api", websiteRouter)
app.use("/api", vocherRouter)





const url = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/Wappzlyzer`;

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connected.....");
      });


app.listen(process.env.PORT, ()=>{
    console.log('listening on port ' + process.env.PORT);
})