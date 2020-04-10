'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/node_modules/three'));
app.use(express.static(__dirname + '/node_modules/three/build'));
app.use(express.static(__dirname + '/node_modules/dat.gui/build'));
app.use(express.static(__dirname + '/node_modules/three/examples/js/controls'));

app.use('/', router);

const router = express.Router();

router.get("/mandelbulb", (request, response) => {
    response.sendFile('../public/mandelbulb.html');
  });
  
router.get("/mandelbrot", (request, response) => {
  response.sendFile('../public/mandelbrot.html');
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);