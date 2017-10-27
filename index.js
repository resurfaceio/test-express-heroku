const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index', function (err, html) {
        response.status(200).send(html);
    });
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

app.get('/send_basic', function (request, response) {
    response.status(200).send('whoop1');
});

app.get('/send_buffer', function (request, response) {
    response.status(200).send(new Buffer('nail the door shut'));
});

app.get('/send_json', function (request, response) {
    response.status(200).send({president: 'lincoln'});
});

app.get('/send_json_array', function (request, response) {
    response.status(200).send([1, 2, 3]);
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
