var util = require("util");
var Mod = require("../../implementations/mod");

function ChaosApple(app, root_path, root_dir)
{
    ChaosApple.super_.apply(this, [app, root_path, root_dir, "chaos-apple"]);
}

util.inherits(ChaosApple, Mod);
module.exports = ChaosApple;