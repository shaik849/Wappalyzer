const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const router = require('./Router/wappalyzerRouter')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"));
app.use("/api",router)


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})