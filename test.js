const { findCirco } = require('./app/services/checkPoint');


const address = "Lyon";
(async () => {
    const circo = await findCirco(address);
    console.log(circo);
})();
