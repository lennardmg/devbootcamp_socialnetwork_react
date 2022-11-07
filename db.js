require("dotenv").config();
const spicedPg = require("spiced-pg");
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);




module.exports.insertUser = function (first_name, last_name, email, password) {
    const sql = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    return db
        .query(sql, [first_name, last_name, email, password])
        .then((result) => result.rows)
        .catch((error) => console.log("error in insertUser function", error));
};


module.exports.findUserByEmail = function (email) {
    const sql = `
        SELECT id, email, password, first_name, last_name, code FROM users WHERE email= $1;
    `;
    return db
        .query(sql, [email])
        .then((result) => {
            return result.rows;
        });
};


module.exports.getUserInfo = function (id) {
    const sql = `
        SELECT * FROM users WHERE id= $1;
    `;
    return db.query(sql, [id]).then((result) => {
        return result.rows;
    });
};


module.exports.getUsersWhoRecentlyJoined = function () {
    const sql = `
        SELECT * FROM users 
        ORDER BY id DESC 
        LIMIT 3;
    `;
    return db.query(sql).then((result) => {
        return result.rows;
    });
};

module.exports.searchUsers = function (searchInput) {
    const sql = `
        SELECT id, first_name, last_name, profile_pic_url FROM users 
        WHERE first_name ILIKE $1;
    `;
    return db.query(sql, [searchInput + "%"]).then((result) => {
        return result.rows;
    });
};




module.exports.storePwResetCode = function (email, code) {
    const sql = `
        UPDATE users SET code = $2 
        WHERE email = $1;
    `;
    return db
        .query(sql, [email, code])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error in storePwResetCode function", error)
        );
};


module.exports.resetPassword = function (email, password) {
    const sql = `
    UPDATE users SET password = $2
    WHERE email = $1
    `;
    return db
        .query(sql, [email, password])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error in resetPassword function", error)
        );
};



// 1) getFriendship
// whenever visiting somebodys profile
// find a friendship between

module.exports.getFriendship = function (user1, user2) {
    const sql = `
    SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1);
    `;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows);
};

// 2) insertFriendship
// once the button is clicked, creates an unaccepted friendship, boolean = false 

module.exports.insertFriendship = function (user1, user2) {
    const sql = `
    INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2) 
    RETURNING *
    `;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows);
};

// 3) deleteFriendship
// delete the row by the 2 (!) user IDs

module.exports.deleteFriendship = function (user1, user2) {
    const sql = `
    DELETE FROM friendships 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1);
    `;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows);
};

// 4) acceptFriendship
// find friendship
// update the boolean row by the 2 (!) user IDs

module.exports.acceptFriendship = function (user1, user2) {
    const sql = `
    UPDATE friendships SET accepted = true 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1);
    `;
    return db
        .query(sql, [user1, user2])
        .then((result) => result.rows);
};


module.exports.updateProfilePic = function (id, url) {
    const sql = `
        UPDATE users SET profile_pic_url = $2 
        WHERE id = $1;
    `;
    return db
        .query(sql, [id, url])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error in storePwResetCode function", error)
        );
};

module.exports.updateBio = function (id, bio) {
    const sql = `
    UPDATE users SET bio = $2
    WHERE id = $1;
    `;
    return db
        .query(sql, [id, bio])
        .then((result) => result.rows);
};


module.exports.showFriends = function (id) {
    const sql = `
SELECT users.id, first_name, last_name, accepted, profile_pic_url FROM users
JOIN friendships
ON (accepted = true AND recipient_id = $1 AND users.id = friendships.sender_id)
OR (accepted = true AND sender_id = $1 AND users.id = friendships.recipient_id)
OR (accepted = false AND recipient_id = $1 AND users.id = friendships.sender_id)
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows);
};

////////////////// Global Chat: ////////////////////////////

module.exports.getLastMessages = (limit = 10) => {
    const sql = `
SELECT users.id, messages.id AS messagesId, first_name, last_name, profile_pic_url, message, messages.created_at 
FROM users JOIN messages
ON users.id = messages.sender_id
ORDER BY messages.created_at DESC
LIMIT $1
`;
    return db.query(sql, [limit])
        .then((result) => result.rows);
};


module.exports.insertMessage = (sender_id, message) => {
    const sql = `
   INSERT INTO messages (sender_id, message)
    VALUES ($1, $2) 
    RETURNING *
`;
    return db.query(sql, [sender_id, message])
        .then((result) => result.rows);
};

module.exports.deleteUser = (id) => {
    const sql = `
  DELETE FROM users
  WHERE id = $1 
`;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((error) => console.log("error in deleteUser function", error));
};