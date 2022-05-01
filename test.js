const { findMyMp } = require('./app/modules/mpFinder');
const { findCirco } = require("../modules/checkPoint");

console.log(findMyMp('69', '06'));


/*
const address = "Lyon";
(async () => {
    const circo = await findCirco(address);
    console.log(circo);
})();
*/