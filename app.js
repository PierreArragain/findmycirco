const express = require("express");

const path = require('path');

const favicon = require("serve-favicon");

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

const router = require('./app/router');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './app/public')));
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});