var express = require('express');
var app = express();

app.use(express.static('views'));
app.use(express.static('node_modules/three'));
app.use(express.static('node_modules/three/build'));
app.use(express.static(__dirname +'/node_modules/dat.gui/build'));
app.use(express.static(__dirname +'/node_modules/three/examples/jsm/controls'));

// listen for requests :)
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});