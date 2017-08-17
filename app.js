const path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const ROOT_PATH = '/spellbook';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* SETUP ROUTES */
var port = process.env.PORT || 6660;
var router = express.Router();

require('fs').readdirSync(__dirname + '/routes').forEach(function (file)
{
    module.exports[path.basename(file, '.js')] =
        require(path.join(__dirname + '/routes', file))(app,
            ROOT_PATH);
});

router.get('/', function (req, res)
{
    res.json({message: 'Spellbook open'});
});

app.use(ROOT_PATH, router);
app.listen(port);
console.log('With a flick of his wand, Salem unlocks his magical spellbook labeled, "' + port + '"');
