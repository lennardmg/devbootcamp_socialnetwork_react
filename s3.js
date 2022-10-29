require("dotenv").config();

const secrets = process.env;

const fs = require("fs");
const aws = require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    console.log("TEST!!!!");
    console.log(req.file);
    if (!req.file) {
        res.json({
            success: false,
            message: "Upload failed!",
        });
    }

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
            console.log("success");

            //// to delete the file in the /upload folder
            fs.unlink(path, () => {});

            next();
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
};
