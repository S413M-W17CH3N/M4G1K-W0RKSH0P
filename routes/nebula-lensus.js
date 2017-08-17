/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: nebula-lensus .js                                 *
 * This route is used to insert encrypted entries into the  *
 * magic library database.                                  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

var fs = require('fs');
var uuidv1 = require('uuid/v1');
var crypto = require('crypto');
var CONFIG = require('../config');
algorithm = 'aes-256-ctr'

module.exports = function (app, root_path)
{
    const local_root = root_path + '/nebula-lensus';
    var database = 'library';

    function encrypt(buffer, key)
    {
        key = key == null ? CONFIG.library.public_key : key;
        var cipher = crypto.createCipher(algorithm, key);
        return Buffer.concat([cipher.update(buffer), cipher.final()]);
    }

    function decrypt(buffer, key)
    {
        key = key == null ? CONFIG.library.public_key : key;
        var decipher = crypto.createDecipher(algorithm, key);
        return Buffer.concat([decipher.update(buffer), decipher.final()]);
    }

    function encrypt_spell(spell)
    {
        return {
            _id: spell._id,
            key: encrypt(spell.key, null),
            value: encrypt(spell.value, null),
            filter: spell.filter,
            timestamp: spell.timestamp,
            locked: spell.locked
        }
    }

    function decrypt_spell(spell)
    {
        return {
            _id: spell._id,
            key: decrypt(spell.key, null),
            value: decrypt(spell.value, null),
            filter: spell.filter,
            timestamp: spell.timestamp,
            locked: spell.locked
        }
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
        var dataObject = encrypt_spell(
            {
                _id: uuidv1(),
                key: req.body.key,
                value: req.body.value,
                filter: req.body.filter,
                timestamp: new Date(),
                locked: lock == null ? false : true
            }, lock);

        res.status(200).json(decrypt_spell(dataObject));
    });
};
