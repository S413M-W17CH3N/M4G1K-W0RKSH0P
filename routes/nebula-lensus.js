/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: nebula-lensus .js                                 *
 * This route is used to insert encrypted entries into the  *
 * library database                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

var crypto = require('crypto');
var CONFIG = require('../config');

var Book = require('../models/book');

module.exports = function (app, root_path)
{
    const local_root = root_path + '/nebula-lensus';

    function encrypt(input, key)
    {
        key        = key == null ? CONFIG.library.public_key : key;
        var cipher = crypto.createCipher(CONFIG.library.algorithm, key);
        var result = cipher.update(input, 'utf8', 'base64');
        result += cipher.final('base64');

        return result;
    }

    function decrypt(input, key)
    {
        key          = key == null ? CONFIG.library.public_key : key;
        var decipher = crypto.createDecipher(CONFIG.library.algorithm, key);
        var result   = decipher.update(input, 'base64', 'utf8');
        result += decipher.final('utf8');

        return result;
    }

    // returns books by id
    app.get(local_root + '/:id', function (req, res)
    {
        var lock = req.headers.lock ? req.headers.lock : null;
        var book = new Book({id: req.params.id});
        book.load(function (err, data)
        {
            if (err == 404)
            {
                res.status(404).json(data);
            }
            else if (err)
            {
                res.status(500).json({"error": err});
            }
            else
            {
                data.field_key   = decrypt(data.field_key, lock);
                data.field_value = decrypt(data.field_value, lock);
                res.status(200).json(data);
            }
        })
    });

    // returns books by filter
    app.get(local_root + '/filter/:filter', function (req, res)
    {
        var lock   = req.headers.lock ? req.headers.lock : null;
        var filter = req.params.filter;
        var book   = new Book(null);

        book.filter(filter, function (err, data)
        {
            if (err)
            {
                res.status(500).json({"error": err});
            }
            else
            {
                for (i = 0; i < data.length; i++)
                {
                    data[i].field_key   = decrypt(data[i].field_key, lock);
                    data[i].field_value = decrypt(data[i].field_value, lock);
                }
                res.status(200).json(data);
            }
        })
    });

    app.post(local_root, function (req, res)
    {

        var lock = req.headers.lock ? req.headers.lock : null;
        var book = new Book({
            field_key:   encrypt(req.body.field_key, lock),
            field_value: encrypt(req.body.field_value, lock),
            filter:      req.body.filter,
            locked:      lock != null
        });

        book.save(function (err, data)
        {
            if (err)
            {
                res.status(500).json({"error": err});
            }

            res.status(200).json({
                "message": "Book Successfully inserted",
                "book":    data
            });
        });
    });
};
