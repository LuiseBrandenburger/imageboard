const aws = require("aws-sdk");
const fs = require("fs");
// const { nextTick } = require("process");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
}); //instance of aws user, allows us to communicate with our S3 Bucket

module.exports.upload = (req, res, next) => {

    if(!req.file){
        console.log("no file, something went wrong with multer");
        return res.sendStatus(500);
    } 

    // if we make it here, there is a file to upload
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("img is in the cloud");
            next();
            fs.unlink(path, ()=> {});
        })
        .catch((err) => {
            // uh oh
            console.log("error uploading img to cloud",err);
            return res.sendStatus(500);
        });
};
