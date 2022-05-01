const express = require('express');
const mainController = require("./controllers/mainController");
const { findCirco } = require('./modules/checkPoint');


const router = express.Router();

router.get("/", mainController.homePage);

router.get("/search/results", mainController.findCirco);

module.exports = router;