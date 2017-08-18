var CONFIG = require('../config');

function LibraryObject(table, data)
{
    this.table = "`" + CONFIG.database.library.database_name + "`.`" + table + "`";
    this.id = data.id ? data.id : null;
    this.data = data.id ? this.load(this.id) : data;
}

LibraryObject.prototype = {
    save: function (callback)
    {
        var libraryObject = this;
        CONFIG.database.library.connection_pool.getConnection(function (err, connection)
        {
            if (err)
            {
                callback(err, {"error": true, "code": 100, "status": "Error in connection database"});
            }

            connection.on('error', function (err)
            {
                console.log(err);
                callback(err, {"code": 100, "status": "Error on LibraryObject.save()..."});
            });

            if (!libraryObject.id) // We preform an insert
            {
                connection.query("INSERT INTO " + libraryObject.table + " SET ?", libraryObject.data,
                    function (err, results, fields)
                    {
                        if (err)
                        {
                            callback(err, {"code": 100, "status": "Error on LibraryObject.save()..."});
                        }
                        else
                        {
                            callback(null, {"results": results, "fields": fields});
                        }
                    }
                );
            }
            else // We preform an update
            {
                connection.query("UPDATE " + libraryObject.table + " SET ? WHERE `id` = ?", [libraryObject.data, libraryObject.id],
                    function (err, results, fields)
                    {
                        if (err)
                        {
                            callback(err, {"code": 100, "status": "Error on LibraryObject.save()..."});
                        }
                        else
                        {
                            callback(null, {"results": results, "fields": fields});
                        }
                    }
                );
            }
        });
    },

    load: function (objectId, callback)
    {
        var libraryObject = this;
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

            console.log("Loading LibraryObject: " + objectId);
            connection.query("SELECT * FROM " + libraryObject.table + " WHERE `id` = " + connection.escape(objectId),
                function (err, rows)
                {
                    connection.release();
                    if (err)
                    {
                        callback(err, {"code": 100, "status": "Error on LibraryObject.load()..."});
                    }
                    else
                    {
                        callback(null, rows);
                    }
                }
            );
        });
    },

    delete: function (callback)
    {
        var libraryObject = this;
        CONFIG.database.library.connection_pool.getConnection(function (err, connection)
        {
            if (err)
            {
                console.log(
                    "Attempted to load a library object, but it seems communication to the library of magic is down.");
                callback(err, {"error": true, "code": 100, "status": "Error in connection database"});
            }

            connection.on('error', function (err)
            {
                callback(err, {"code": 100, "status": "Error on LibraryObject.delete()..."});
            });

            console.log("Deleting LibraryObject: " + libraryObject.id);
            connection.query("DELETE FROM " + libraryObject.table + " WHERE `id` = " + connection.escape(libraryObject.id),
                function (err, results, fields)
                {
                    connection.release();
                    if (err)
                    {
                        callback(err, {"code": 100, "status": "Error on LibraryObject.delete()..."});
                    }
                    else
                    {
                        callback(null, {"message": "object deleted"});
                    }
                }
            );
        });
    }
};

module.exports = LibraryObject;