/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: nebula-lensus .js                                 *
 * This route is used to insert encrypted entries into the  *
 * magic library database.                                  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

var crypto = require('crypto');
var CONFIG = require('../config');

var Spell = require('../models/spell');

module.exports = function (app, root_path)
{
    const local_root = root_path + '/nebula-lensus';

    function encrypt(input, key)
    {
        key = key == null ? CONFIG.library.public_key : key;
        var cipher = crypto.createCipher(CONFIG.library.algorithm, key);
        var result = cipher.update(input, 'utf8', 'base64');
        result += cipher.final('base64');

        return result;
    }

    function decrypt(input, key)
    {
        key = key == null ? CONFIG.library.public_key : key;
        var decipher = crypto.createDecipher(CONFIG.library.algorithm, key);
        var result = decipher.update(input, 'base64', 'utf8');
        result += decipher.final('utf8');

        return result;
    }

    // returns spells by filter
    app.get(local_root + '/filter', function (req, res)
    {
        res.json(
            {
                message: 'Spellbook open'
            });
    });

    app.post(local_root, function (req, res)
    {

        var lock = req.body.lock;
        var spell = new Spell({
            field_key: encrypt(req.body.field_key, lock),
            field_value: encrypt(req.body.field_value, lock),
            filter: req.body.filter,
            locked: lock != null
        });

        spell.save(function (err, data)
        {
            if (err)
            {
                res.status(500).json({"error": err});
            }

            res.status(200).json({
                "message": "Spell Successfully inserted",
                "spell": data
            });
        });
    });
};
