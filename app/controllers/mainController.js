const errorController = require("./errorController");

const mainController = {
    homePage: (req, res) => {
        res.render('home');
    },

    legal: (req, res) => {
        // Affichages des mentions légales
        res.render('legal');
    }
}


module.exports = mainController;