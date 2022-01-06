const express = require("express");
const moment = require("moment");
const app = express();
const {
    getImages,
    addImage,
    getImgByID,
    addComment,
    getCommentsByID,
    getMoreImagesByID
} = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
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

app.get("/get-img-by-id-data/:id", (req, res) => {
    getImgByID(req.params.id).then(({ rows }) => {
        let dateAdded = moment(rows[0].created_at).fromNow();
        rows[0].dateAdded = dateAdded;
        res.json(rows);
    });
});

app.get("/get-more-images/:id", (req, res) => {

    getMoreImagesByID(req.params.id).then(({ rows }) => {
        res.json(rows);
    });
});


app.get("/comments/:id", (req, res) => {

    getCommentsByID(req.params.id).then(({ rows }) => {
        rows.forEach( row => {
            let dateAddedComment = moment(row.created_at).fromNow();
            row.dateAddedComment = dateAddedComment;
        });
        res.json(rows);
    });
});

app.post("/upload-comment", (req, res) => {
    
    addComment(req.body.username, req.body.comment, req.body.img_id)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error adding comment into db", err);
            res.sendStatus(500);
        });

});


app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
