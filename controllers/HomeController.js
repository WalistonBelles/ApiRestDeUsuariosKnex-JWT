class HomeController{

    async index(req, res){
        res.send("Home...");
    }

}

module.exports = new HomeController();