const express = require('express');
const app = express();
const { getImages } = require("./db");
const { uploader } = require('./upload');
const s3 = require("./s3");


app.use(express.static('./public'));
app.use(express.json());


app.post('/upload', uploader.single('file'), s3.upload, (req, res)=>{
    console.log("log body: ",req.body);
    console.log("log file: ", req.file);
    // res.send('Upload Successfull');
});

app.get('/get-imageboard-data', (req, res) => {
    getImages().then(({ rows }) => {
        res.json(rows);
    });
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));