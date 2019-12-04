const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();


const routes = (require('./routes'))
const db = require('./config/db')
const port = process.env.PORT || 3000;
const address = process.env.address || '127.0.0.1'

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const  index  = require('./routes/index');
app.use('/', index);


//const { addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage } = require('./routes/player');

app.listen(port, address, () => console.log("App started"))