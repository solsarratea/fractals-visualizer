'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    response.sendFile(__dirname + "/public/index.html");
});
router.get("/mandelbulb", (request, response) => {
    response.sendFile(__dirname + "/public/mandelbulb.html");
  });
  
  router.get("/mandelbrot", (request, response) => {
    response.sendFile(__dirname + "/public/mandelbrot.html");
  });

app.use(express.static('public'));
app.use(express.static('public/js'));

app.use(express.static(__dirname +'node_modules/three'));
app.use(express.static(__dirname +'node_modules/three/build'));
app.use(express.static(__dirname +'/node_modules/dat.gui/build'));
app.use(express.static(__dirname +'/node_modules/three/examples/js/controls'));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);