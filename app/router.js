const express = require('express');
const circoController = require('./controllers/circoController');
const mainController = require("./controllers/mainController");


const router = express.Router();

router.get("/", mainController.homePage);

router.get("/legal", mainController.legal);

router.get("/search/results", circoController.findCirco);

module.exports = router;