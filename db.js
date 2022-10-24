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
