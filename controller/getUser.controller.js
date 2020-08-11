const UserModel = require('../model/user.model');
const { render } = require('node-sass');

module.exports.loadUser = async function (req, res){
    res.render('vwUser/indexUser');
};
module.exports.loadUpdateUser = async function (req, res){
    const id = +req.params.id || 1;

    const listUser = await UserModel.loadUpdateUser(id);

    let isWriter = listUser[0].TypeOfUser === 3 ? true : false;

    //console.log(listUser)

    res.render('vwUser/updateInfo',{
        listUser : listUser[0], 
        isWriter
    });
};
module.exports.updateUser = async function (req, res) {
    
    let entity;
    if(req.body.hasProperty('butdanh'))
    {
        entity = 
        {
            Name: req.body.UserName,
            Email: req.body.Email,
            BirthDay: req.body.bday,
            PenName: req.body.butdanh,
            UserID: req.body.id
        }
    }
    else 
    {
        entity = 
        {
            Name: req.body.UserName,
            Email: req.body.Email,
            BirthDay: req.body.bday,
            UserID: req.body.id
        }
    }
    await UserModel.updateUser(req.body);
  
    res.redirect("/User");
  }