const User = require('../models/User');

class UserController {
    
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if (user == undefined){
            res.status(404);
            res.json({})
        }else {
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res) {
        var {email, name, password} = req.body;
        var emailError;
        var nameError;
        var passwordError;

        if (email == undefined || email == "") {
            emailError = 'O e-mail não pode ser vazio!';
            res.status(400);
            res.json({err: emailError});
            return;
        }
        
        if (name == undefined || name == ""){
            nameError = 'O nome não pode ser vazio!!';
            res.status(400);
            res.json({err: nameError});
            return;
        }

        if (password == undefined || password == "" || password.length < 8) {
            passwordError = 'A senha precisa ter pelo menos 8 caracteres!!';
            res.status(400);
            res.json({err: passwordError});
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: 'O e-mail já está cadastrado!'});
            return;
        }
        
        await User.new(email, password, name);

        res.status(200);
        res.send ('Tudo ok');
    }
}

module.exports = new UserController();