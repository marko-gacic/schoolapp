const db = require('../db/db');

/**
 * If the user exists and the password is correct, return the user, otherwise return undefined.
 * @param user - {
 * @returns The user object with the password property set to an empty string.
 */
async function login(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ?', [user.username]);
    if (rows && rows.length > 0 && rows[0].password == user.password) {
        rows[0].password = '';
        return rows[0];
    }
    return undefined;

}

async function register(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ?', [user.username]);
    if (rows && rows.length > 0) {
        return undefined;
    }
    const result = await db.query('INSERT INTO user (userName, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email]);
    user.id = result.insertId;
    return user;
}

async function resetPassword(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ?', [user.username]);
    if (rows && rows.length > 0) {
        const result = await db.query('UPDATE user SET password = ? WHERE userName = ?', [user.password, user.username]);
        return result.affectedRows > 0;
    }
    return false;
}

async function changePassword(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ? AND password = ?', [user.username, user.oldPassword]);
    if (rows && rows.length > 0) {
        const result = await db.query('UPDATE user SET password = ? WHERE userName = ?', [user.password, user.username]);
        return result.affectedRows > 0;
    }
    return false;
}

//async function edit (user)  with picture upload

async function edit(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ?', [user.username]);
    if (rows && rows.length > 0) {
        const result = await db.query('UPDATE user SET password = ?, email = ?, picture = ? WHERE userName = ?', [user.password, user.email, user.picture, user.username]);
        return result.affectedRows > 0;
    }
    return false;
}


module.exports = {
    login,
    register,
    resetPassword,
    changePassword,
    edit
}