const express = require('express');
const session = require('express-session');

const app = express();
app.set('port', (process.env.PORT || 5000));

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

// add Resurface after body/session middleware
const resurfaceio = require('resurfaceio-logger');
resurfaceio.HttpLoggerForExpress.add(app, {
    rules: 'include debug'
});

app.get('/', function (request, response) {
    response.status(200).send('Hello from Express');
});

app.post('/', function (request, response) {
    let html = '<html><p>Posted to Express:</p>';
    const body = request.body;
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            html += `<p>${key}:${body[key]}</p>`;
        }
    }
    html += '</html>\n';
    response.status(200).send(html);
});

app.get('/ping', function (request, response) {
    response.status(200).json({msg: 'pong'});
});

app.get('/send_array', function (request, response) {
    response.status(200).send([1, 2, 3]);
});

app.get('/send_basic', function (request, response) {
    response.status(200).send('whoop1');
});

app.get('/send_buffer', function (request, response) {
    response.status(200).send(new Buffer('nail the door shut'));
});

app.get('/write', function (request, response) {
    response.status(200);
    response.type('text/plain');
    response.write('hello');
    response.write(' world');
    response.end();
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
