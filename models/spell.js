/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *\
 * ROUTE: models/book.js                                    *
 * The spell model is used to manage encrypted data         *
 * coming in and out of our library database schema.        *
 *                                                          *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

var util = require('util');
var LibraryObject = require("../implementations/library-object");
var CONFIG = require("../config");

function SpellModel(spellData)
{
    SpellModel.super_.apply(this, ["spells", spellData]);
};

SpellModel.prototype = {
    filter: function(filter, callback)
    {
        var spellModel = this;
        CONFIG.database.library.connection_pool.getConnection(function (err, connection)
        {
            if (err)
            {
                console.log(
                    "Attempted to load a library object, but it seems communication to the library of magic is down.");
                callback(err, {"code": 100, "status": "Error in connection database"});
            }

            connection.on('error', function (err)
            {
                callback(err, {"error": true, "code": 100, "status": "Error on LibraryObject.load()..."});
            });

            console.log("Loading SpellModel by filter: " + filter);
            connection.query("SELECT * FROM " + spellModel.table + " WHERE `filter` Like " + connection.escape(filter),
                function (err, rows)
                {
                    connection.release();
                    if (err)
                    {
                        callback(err, {"code": 100, "status": "Error on SpellModel.filter()..."});
                    }
                    else
                    {
                        callback(null, rows);
                    }
                }
            );
        });
    }
};

util.inherits(SpellModel, LibraryObject);

module.exports = SpellModel;