require('dotenv').config();

const http = require('http');
const router = require('./routes/api');

const port = process.env.PORT || 4040;
const ipAddress = process.env.IP_ADDRESS || 'localhost';

const handleHttpServerErrors = require('./utils/handleHttpServerErrors');

var express = require('express'),
    app     = express();

app.set('port', port);
app.set('ipaddr',ipAddress);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Node Js Server started on:\nip -> ${process.env.IP_ADDRESS}\nport -> ${server.address().port}`);
});

server.on('error', handleHttpServerErrors);

app.use('/', router);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;