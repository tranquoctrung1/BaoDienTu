const UserModel = require('../model/user.model');
const { render } = require('node-sass');

module.exports.loadUser = async function (req, res){
    res.render('vwUser/indexUser');
};
module.exports.loadUpdateUser = async function (req, res){
    const id = +req.params.id || 1;

    res.render('vwUser/updateInfo');
};
module.exports.updateUser = async function (req, res) {

    console.log(req.body);
    await UserModel.updateUser(req.body);
  
    //res.redirect("/User");
  }