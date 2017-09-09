/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: app.js                                            *
 * The main method to be run when the application starts    *
 * Includes basic application setup and route defining.     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

const path      = require('path');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
const fs          = require('fs')
const ROOT_PATH = '/api';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* SETUP ROUTES */
var port   = process.env.PORT || 6660;
var router = express.Router();

fs.readdirSync(__dirname + '/routes').forEach(function (file)
{
    module.exports[path.basename(file, '.js')] =
        require(path.join(__dirname + '/routes', file))(app, ROOT_PATH);
});


/* SETUP MODULES */
var mods           = JSON.parse(fs.readFileSync('modules/modules.json'));
var installed_mods = [];

mods.forEach(function (mod_item)
{
    var ModClass = require(
        path.join(__dirname, "modules", mod_item['root_dir'], mod_item['mod_module'])
    );

    var mod      = new ModClass(app,
        ROOT_PATH + '/m' + mod_item['root_route'] ,
        path.join(__dirname, "/modules", mod_item["root_dir"])
    );

    mod.install();
    installed_mods.push(mod);
});

router.get('/', function (req, res) {res.json({message: 'Spellbook open'}); });

app.use(ROOT_PATH, router);
app.listen(port);
console.log('With a flick of his wand, Salem unlocks his magical spellbook labeled, "' + port + '"');
console.log('http://0.0.0.0:' + port + ROOT_PATH);

