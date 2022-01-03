const express = require('express');
const app = express();
const { getImages } = require("../db");

app.use(express.static('./public'));

app.use(express.json());


app.get('/imageboard-data', (req, res) => {
    getImages().then((data) => {
        console.log("data from get Images", data);
    });
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));