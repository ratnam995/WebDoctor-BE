const express= require('express');
const MongoClient= require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const db= require('./config/db');
const app= express();
const authMiddleware= require('./app/auth-middleWare');
// var express = require('express');
var router = express.Router();

const port = 8000;

// require('./app/routes')(app, {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    require('./app/routes')(app, database.db("webDoctor-DB"));

    app.listen(port, () => {
      console.log('We are live on ' + port);
      console.log('We are live on ' + new Date());
    });               
  })