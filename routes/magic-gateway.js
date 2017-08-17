/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: magic-gateway.js                                  *
 * This route is use to manage API users. It is also used   *
 * to manage API keys and credential services.              *
 *                                                          *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

var fs = require('fs');
var uuidv1 = require('uuid/v1');
var crypto = require('crypto');

module.exports = function (app, root_path)
{
    const local_root = root_path + '/magic-gateway';

    // Generates random encryption key
    app.get(local_root + '/keysmith', function (req, res)
    {
        var generated_key = crypto.randomBytes(Math.ceil(512 / 2)).toString('hex').slice(0, 512);

        res.status(201).json(
            {
                "message": "Here is your magic key, please keep it in a safe place, we do not keep spares.",
                "key": generated_key
            });
    });
}
