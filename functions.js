const bcrypt = require("bcryptjs");



module.exports.authenticate = function (password, hashedPassword) {
    const PwInUsersTable = hashedPassword;
    const inputPassword = password;
    return bcrypt.compare(inputPassword, PwInUsersTable);
};
