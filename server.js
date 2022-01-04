const express = require("express");
const app = express();
const { getImages, addImage } = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("log body: ", req.body);
    console.log("log file: ", req.file);
    // res.send('Upload Successfull');
    // add file URL to db

    if (req.file) {
        const fileName = req.file.filename;
        const urlToSaveInDB = `https://s3.amazonaws.com/spicedling/${fileName}`;
    
        addImage(
            req.body.description,
            req.body.username,
            req.body.title,
            urlToSaveInDB
        )
            .then(({ rows }) => {
                console.log("image successfully saved in db");
                console.log("rows", rows);
                res.json(rows);
            })
            .catch((err) => {
                console.log("error adding img to db", err);
                res.sendStatus(500);
            });
    } else {
        // TODO: what do we do if success is false??
        res.json({ success: false });
    }

});

app.get("/get-imageboard-data", (req, res) => {
    getImages().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
