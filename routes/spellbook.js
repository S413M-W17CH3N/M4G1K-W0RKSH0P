/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 * ROUTE: spellbook.js                                      *
 * This route is a command dispatcher, clients hit this     *
 * route to receive tasks to run. A single client hits      *
 * this route once ever 20 seconds.                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
 *              <0>     The iNBETWEEN    <0>                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

module.exports = function (app, root_path)
{
    const local_root = root_path + '/spellbook';

    // Queue up a spell to be casted over the "magic-cluster-network"
    app.post(local_root + '/cast', function (req, res)
    {

    });
};