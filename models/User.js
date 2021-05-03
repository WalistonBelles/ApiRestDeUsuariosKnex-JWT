const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {

    async new(email, password, name){
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, name, role: 0}).table('users');
        }catch(err){
            console.error(err);
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select('*').from('users').where({email: email});
            
            if(result.length > 0){
                return true;
            }else {
                return false;
            }


        }catch(err) {
            console.log(err);
            return false;
        }
        
    }
}

module.exports = new User();