module.exports = function (app, root_path)
{
    const local_root = root_path + '/shop';

    app.get(local_root, function (req, res)
    {
        res.status(201).json(
            {
                "message": "chaos-apple/shop is live!"
            });
    });
};
