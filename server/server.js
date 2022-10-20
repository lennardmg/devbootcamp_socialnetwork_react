const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
require("dotenv").config();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const { insertUser } = require("../db.js");
// const { authenticate } = require("../functions.js");

//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});



// still need to insert req & res again
app.post("/registration", (req, res) => {

    // console.log("req.body in post /registration: ", req.body);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;


    function hashing() {
        let hashedPassword = "";

        bcrypt
            .genSalt()
            .then((salt) => {
                return bcrypt.hash(password, salt);
            })
            .then((hash) => {
                hashedPassword = hash;
            })
            .then(() => {

                insertUser(firstname, lastname, email, hashedPassword)
                    .then(() => {
                        res.json({
                            success: true,
                        });
                    })
                    .catch((err) => {
                        console.log("error in insertUser with POST /registration ", err);
                    });
            })
            .catch((err) => {
                console.log("error in hashing function with POST /registration ", err);
            });
    }
    hashing();

});




app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
