var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('public/js'));

app.use(express.static('node_modules/three'));
app.use(express.static('node_modules/three/build'));
app.use(express.static(__dirname +'/node_modules/dat.gui/build'));

app.use(express.static(__dirname +'/node_modules/three/examples/js/controls'));

app.get("/mandelbulb", (request, response) => {
  response.sendFile(__dirname + "/public/mandelbulb.html");
});

app.get("/mandelbrot", (request, response) => {
  response.sendFile(__dirname + "/public/mandelbrot.html");
});


var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});