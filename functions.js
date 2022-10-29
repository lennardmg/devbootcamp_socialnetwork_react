const bcrypt = require("bcryptjs");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");


module.exports.authenticate = function (password, hashedPassword) {
    const PwInUsersTable = hashedPassword;
    const inputPassword = password;
    return bcrypt.compare(inputPassword, PwInUsersTable);
};



const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            const extension = path.extname(file.originalname);
            const randomFileName = uid + extension;
            callback(null, randomFileName);
        });
    },
});

module.exports.uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});
