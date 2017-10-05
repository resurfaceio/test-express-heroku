var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
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

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


