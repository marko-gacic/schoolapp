const db = require('../db/db');

async function login(user) {
    const rows = await db.query('SELECT * FROM user WHERE userName = ?', [user.username]);
    if (rows && rows.length > 0 && rows[0].password == user.password) {
        rows[0].password = '';
        return rows[0];
    }
    return undefined;

}



module.exports = {
    login
}