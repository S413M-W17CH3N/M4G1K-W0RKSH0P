/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * IMPL: module.js                                          *
 * This object is an implementation for including and       *
 * structuring application expansion modules.               *
 *                                                          *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *         <0>     iNBETWEEN ENTERPRISES    <0>             *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

const fs = require('fs');
const path      = require('path');

function Mod(app, root_path, root_dir, name)
{
    this.app       = app;
    this.root_path = root_path;
    this.root_dir  = root_dir;
    this.name      = name;
}

Mod.prototype = {
    install: function install()
             {
                 console.log("\nInstalling Module: " + this.name);

                 function installRoutes(mod)
                 {
                     fs.readdirSync(mod.root_dir + '/routes').forEach(function (file)
                     {
                         module.exports[path.basename(file, '.js')] =
                             require(path.join(mod.root_dir, '/routes', file))(mod.app, mod.root_path);

                         console.log("Installed Route: " + path.join(mod.root_path, path.basename(file, '.js')));
                     });
                 }

                 installRoutes(this);
                 console.log('Installed Module: ' + this.name, "\n");
             }
};


module.exports = Mod;