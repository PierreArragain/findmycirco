const errorController = require("./errorController");
const {
    findCirco
} = require("../services/checkPoint");

const mainController = {
    homePage: (req, res) => {
        res.render('home');
    },

    findCirco: async (req, res) => {
        const query = req.query;
        const searchedAddress = `${query.streetNumber} ${query.streetName} ${query.zip} ${query.townName}`

        const result = await findCirco(searchedAddress);
        res.render("results", {
            result
        });
    }
}


module.exports = mainController;