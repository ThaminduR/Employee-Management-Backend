const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();
var cookieParser = require('cookie-parser')

require('dotenv').config()

const port = process.env.PORT
const address = process.env.address 


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const index = require('./routes/indexRoutes')
app.use('/', index);



app.listen(port, address, () => console.log("App started"))