const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();
var cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000;
const address = process.env.address || '127.0.0.1'
const secret = process.env.secret || 'hellofromtheotherside'

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const index = require('./routes/index')
app.use('/', index);

require('dotenv').config()

app.listen(port, address, () => console.log("App started"))