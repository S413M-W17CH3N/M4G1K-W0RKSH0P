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

var SpellModel = function(spellData)
{
    SpellModel.super_.apply(this, ["spells", spellData]);
};

util.inherits(SpellModel, LibraryObject);

module.exports = SpellModel;