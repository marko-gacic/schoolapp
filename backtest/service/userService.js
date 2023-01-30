const db = require('../db/db');

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

module.exports = {
    login,
    register,
    resetPassword,
    changePassword
}