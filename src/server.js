'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    console.log( __dirname )
    res.sendFile("public/index.html");
});
router.get("/mandelbulb", (request, response) => {
    response.sendFile("public/mandelbulb.html");
  });
  
  router.get("/mandelbrot", (request, response) => {
    response.sendFile("public/mandelbrot.html");
  });

app.use(express.static('public'),router);
app.use(express.static('public/js')),router;

app.use(express.static('node_modules/three'),router);
app.use(express.static('node_modules/three/build'),router);
app.use(express.static('node_modules/dat.gui/build'),router);
app.use(express.static('node_modules/three/examples/js/controls'),router);


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);