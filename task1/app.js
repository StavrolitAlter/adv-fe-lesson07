var express = require('express');
var path = require('path');
var jsonServer = require('json-server');

var app = express();

var CLIENT_PATH = '/client_build';

app.get('/test',function (req, res) {
    res.sendFile(path.join(__dirname, CLIENT_PATH, '/test.html'));
});
app.use('/', express.static(path.join(__dirname, CLIENT_PATH, '/')));
app.use('/json-server', jsonServer.router('api/mocks/db.json'));

app.listen(3000, function () {
    console.log('listening 3000');
});