const errorController = require("./errorController");
const {
    findCirco
} = require("../modules/checkPoint");
const { findMyMp } = require("../modules/mpFinder")
const mainController = {
    homePage: (req, res) => {
        res.render('home');
    },

    findCirco: async (req, res) => {
        const query = req.query;
        const searchedAddress = `${query.streetNumber} ${query.streetName} ${query.zip} ${query.townName}`

        const result = await findCirco(searchedAddress);

        const myMP = findMyMp(result.numDpt, result.numCirco);
        console.log(myMP);
        res.render("results", {
            result: result,
            myMp : myMP
        });
    }
}


module.exports = mainController;