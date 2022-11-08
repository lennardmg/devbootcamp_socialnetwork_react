const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
require("dotenv").config();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(compression());
const cryptoRandomString = require("crypto-random-string");
const s3 = require("../s3");

// for changing the date format with date FNS JS:

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSessionMiddleware = cookieSession({
    secret: process.env.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);


const {
    insertUser,
    findUserByEmail,
    storePwResetCode,
    resetPassword,
    getUserInfo,
    getUsersWhoRecentlyJoined,
    searchUsers,
    getFriendship,
    insertFriendship,
    deleteFriendship,
    acceptFriendship,
    updateProfilePic,
    updateBio,
    showFriends,
    getLastMessages,
    insertMessage,
    deleteUser
} = require("../db.js");

const { authenticate, uploader } = require("../functions.js");

// app.use((req, res, next) => {
//     console.log("---------------------");
//     console.log("req.url:", req.url);
//     console.log("req.method:", req.method);
//     console.log("logged-in user, req.session.userId:", req.session.userId);
//     console.log("req.body:", req.body);
//     console.log("---------------------");
//     next();
// });

////////////// socket stuff: /////////////

const server = require("http").Server(app);

const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    }
});

io.use ((socket, next) => {

    cookieSessionMiddleware(socket.request, socket.request.res, next);

});

io.on("connection", async (socket) => {
    const userId = socket.request.session.userId;

    if (!userId) {
        return socket.disconnect(true);
    }

    // 1) send them the latest messages
    const latestMessages = await getLastMessages();

    socket.emit("chatMessages", latestMessages.reverse());
    
    // 2) listen for a "chatMessage" event
    // created when this socket sends a message
    socket.on("chatMessage", (text) => {

        // 1. store the message in the database
        insertMessage(userId, text)
            .then((data) => {
                
                // console.log("data in insertMessage: ", data);

                let created_at = data[0].created_at;
                let messagesid = data[0].id;
     
                // created_at = created_at.toString().split(" GMT")[0];

                getUserInfo(userId)
                    .then((userData) => {

                        let userWhoSentMessage = {
                            message: text,
                            first_name: userData[0].first_name,
                            last_name: userData[0].last_name,
                            profile_pic_url: userData[0].profile_pic_url,
                            messagesid,
                            created_at,
                            
                        };

                        io.emit("chatMessage", userWhoSentMessage);
                    })
                    .catch((error) => {
                        console.log("error in getUserInfo @socket on connection: ", error);
                    });
            })
            .catch((error) => {
                console.log("error in insertMessage @socket on connection: ", error);
            });


        // 2. broadcast the message to ALL connected sockets!
        // include all relevant info (user's names, profile_pic_url, etc.)
    });

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/user/id", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration", (req, res) => {
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
                    .then((userData) => {
                        req.session.userId = userData[0].id;
                        res.json({
                            success: true,
                            message: "Registration successful",
                        });
                    })
                    .catch((err) => {
                        console.log(
                            "error in insertUser with POST /registration ",
                            err
                        );
                        res.json({
                            success: false,
                            message: "Error",
                        });
                    });
            })
            .catch((err) => {
                console.log(
                    "error in hashing function with POST /registration ",
                    err
                );
            });
    }
    hashing();
});

app.post("/login", (req, res) => {
    // console.log("req.body in post /login: ", req.body);

    const email = req.body.email;
    const password = req.body.password;

    findUserByEmail(email)
        .then((user) => {

            if (!user.length) {

                res.json({
                    success: false,
                    message: "Sorry, something went wrong...",
                });
                return false;
            }

            const userInfo = user[0];
            // console.log("user data: ", user);

            authenticate(password, user[0].password)
                .then((result) => {
                    if (result == true) {
                        req.session.userId = userInfo.id;
                        res.json({
                            success: true,
                            message: "LogIn successful",
                        });
                    }
                    res.json({
                        success: false,
                        message: "Sorry, something went wrong...",
                    });
                })

                .catch((err) => {
                    console.log(
                        "error in authentication inside POST /login ",
                        err
                    );
                    res.json({
                        success: false,
                        message: "Sorry, something went wrong...",
                    });
                });
        })
        .catch((error) => {
            console.log("error in findUserByEmail function", error);
            res.json({
                success: false,
                message: "Sorry, something went wrong...",
            });
        });
});

app.post("/checkemail", (req, res) => {
    const email = req.body.email;

    findUserByEmail(email)
        .then((user) => {
            if (!user.length) {
                res.json({
                    success: false,
                    message:
                        "Please enter a valid and registered Email address.",
                });
                return false;
            }

            const userInfo = user[0];
            const secretCode = cryptoRandomString({
                length: 6,
            });

            console.log("secretCode in findUserByEmail: ", secretCode);

            storePwResetCode(email, secretCode).then(() => {
                res.json({
                    success: true,
                    userInfo: userInfo,
                    message: "Email found, just a sec ...",
                });
            });
        })
        .catch((error) => {
            console.log("error in findUserByEmail function", error);
            res.json({
                success: false,
                message: "Sorry, something went wrong...",
            });
        });
});

app.post("/resetpassword", (req, res) => {
    const email = req.body.email;
    const code = req.body.code;
    const newPassword = req.body.password;

    findUserByEmail(email)
        .then((user) => {
            const userInfo = user[0];

            console.log("userInfo in findUserByEmail: ", userInfo);
            console.log("code: ", code);

            if (userInfo.code == code) {
                function hashing() {
                    bcrypt
                        .genSalt()
                        .then((salt) => {
                            return bcrypt.hash(newPassword, salt);
                        })
                        .then((hash) => {
                            resetPassword(email, hash).then(() => {
                                res.json({
                                    success: true,
                                    message:
                                        "Code approved, updating password ...",
                                });
                            });
                        })
                        .catch((err) => {
                            console.log(
                                "error in hashing function with POST /resetpassword ",
                                err
                            );
                        });
                }

                hashing();
            }
        })
        .catch((error) => {
            console.log("error in findUserByEmail function", error);
            res.json({
                success: false,
                message: "Sorry, something went wrong...",
            });
        });
});

app.get("/getInfoAboutSignedInUser", (req, res) => {
    getUserInfo(req.session.userId)
        .then((user) => {
            const userInfo = user[0];

            // console.log("user in getUserInfo: ", user);
            // console.log("userInfo in getUserInfo: ", userInfo);

            res.json({
                success: true,
                user: userInfo,
            });
        })
        .catch((error) => {
            console.log("error in getUserInfo function", error);
            res.json({
                success: false,
                message: "Sorry, something went wrong...",
            });
        });
});

app.post(
    "/updateProfilePicture",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log("req.file in post updatePic: ", req.file);

        let userId = req.session.userId;
        let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

        updateProfilePic(userId, url).then(() => {
            res.json({
                success: true,
                profile_pic_url: url,
            });
        });
    }
);

app.post("/updateBio", (req, res) => {

    updateBio(req.session.userId, req.body.bio)
        .then(() => {
            res.json({
                success: true
            });
        })
        .catch((error) => {
            console.log("error in updateBio function", error);
        });
});

///////////////////// Finding people (Part 6) /////////////////////////

app.get("/getUsersWhoRecentlyJoined", (req, res) => {
    getUsersWhoRecentlyJoined()
        .then((latestUsers) => {
            res.json({
                success: true,
                latestUsers: latestUsers,
            });
        })
        .catch((error) => {
            console.log("error in getUsersWhoRecentlyJoined function", error);
        });
});

app.get("/searchUsers", (req, res) => {
    // console.log("req.query in /searchUsers: ", req.query);

    searchUsers(req.query.q)
        .then((foundUsers) => {

            // console.log("foundUsers is get /searchUsers: ", foundUsers);

            res.json({
                success: true,
                foundUsers: foundUsers,
            });
        })
        .catch((error) => {
            console.log("error in searchUsers function", error);
        });
});

//////////////////////////////// LogOut & Deletion ///////////////////////////////////////

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({
        success: true,
    });
});

app.get("/deleteuser", (req, res) => {

    deleteUser(req.session.userId)
        .then(() => {

            req.session = null;
            res.json({
                success: true,
            });
        });
});

//////////////////////// Part 7, other profiles //////////////////////////////////

app.get("/user/:id", function (req, res) {
    let chosenUserId = req.params.id;
    // console.log(req.params, "req. params in get/user/:id");
    // console.log("chosenUserId: ", chosenUserId);
    // console.log("req.session.userId: ", req.session.userId);
    // console.log("typeof chosenUserId: ", typeof chosenUserId);

    if (chosenUserId == req.session.userId) {
        res.json({
            success: false,
        });
    } else {
        getUserInfo(chosenUserId)
            .then((userData) => {
                console.log("userData in getUserInfo function", userData);

                res.json({
                    success: true,
                    userData: userData,
                });
            })
            .catch((error) => {
                console.log("error in getUserInfo function", error);
            });
    }
});

//////////////////////////// Part 8, friendship request ///////////////////////////////

app.get("/friendship/:id", (req, res) => {
    let sender = req.session.userId;
    let recepient = req.params.id;

    getFriendship(sender, recepient)
        .then((friendshipInfo) => {

            // console.log("/////////////////////////////////////////");

            // console.log("friendshipInfo: ", friendshipInfo);
            // console.log("friendshipInfo.length: ", friendshipInfo.length);
            // console.log("sender: ", sender);
            // console.log("recepient: ", recepient);

            if (friendshipInfo.length > 0) {
                console.log(
                    "friendshipInfo.sender_id: ",
                    friendshipInfo[0].sender_id
                );

                if (friendshipInfo[0].accepted == false) {
                    if (friendshipInfo[0].sender_id == sender) {
                        res.json({
                            friendshipRequestExists: true,
                            accepted: false,
                            senderIsLoggedInUser: true,
                        });
                    } else {
                        res.json({
                            friendshipRequestExists: true,
                            accepted: false,
                            senderIsLoggedInUser: false,
                        });
                    }
                } else {
                    res.json({
                        friendshipRequestExists: true,
                        accepted: true,
                    });
                }
            } else {
                res.json({
                    friendshipRequestExists: false,
                });
            }
        })
        .catch((error) => {
            console.log("error in getFriendship @ get/friendship/:id", error);
            res.json({
                error: "Sorry, something went wrong...",
            });
        });
});

app.post("/friendship/:id", (req, res) => {
    let sender = req.session.userId;
    let recepient = req.params.id;

    insertFriendship(sender, recepient)
        .then(() => {
            res.json({
                friendshipRequestExists: true,
                accepted: false,
            });
        })
        .catch((error) => {
            console.log(
                "error in insertFriendship @ post/friendship/:id",
                error
            );
            res.json({
                error: "Sorry, something went wrong...",
            });
        });
});

app.post("/friendship/accept/:id", (req, res) => {
    let sender = req.session.userId;
    let recepient = req.params.id;

    acceptFriendship(sender, recepient)
        .then(() => {
            res.json({
                friendshipRequestExists: true,
                accepted: true,
            });
        })
        .catch((error) => {
            console.log(
                "error in acceptFriendship @ post/friendship/accept/:id",
                error
            );
            res.json({
                error: "Sorry, something went wrong...",
            });
        });
});

app.post("/friendship/delete/:id", (req, res) => {
    let sender = req.session.userId;
    let recepient = req.params.id;

    console.log("server request to delete happened");

    deleteFriendship(sender, recepient)
        .then(() => {
            console.log("i'm inside deleteFriendship");

            res.json({
                friendshipRequestExists: false,
                accepted: false,
            });
        })
        .catch((error) => {
            console.log(
                "error in deleteFriendship @ post/friendship/delete/:id",
                error
            );
            res.json({
                error: "Sorry, something went wrong...",
            });
        });
});


app.get("/showFriends", (req, res) => {

    showFriends(req.session.userId)
        .then((friends) => {
            // console.log("I got your friends from DB");
            // console.log("friends: ", friends);

            res.json({
                success: true,
                friends,
            });
        })
        .catch((error) => {
            console.log("error in showFriends @ get/showFriends", error);
            res.json({error: "Sorry, something went wrong...",});
        });
});

/////////////////////////////////////////////////////////////////////////////////////
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


// because of socket.io, its not called app.listen, but:
server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
