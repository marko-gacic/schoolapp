const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM examperiod ORDER BY id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM examperiod'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `SELECT * FROM examperiod  ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`
    console.log('query:', query);
    const data = await db.query(query);

    const pageResponse = {
        content: data,
        totalItems: total.totalItems,
        page: page,
        size: size
    }

    return pageResponse;
}

async function get(id) {
    const data = await db.query(`SELECT * FROM examperiod WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let message = `Invalid id ${id}`;
    return { message };
}

async function create(examperiod) {
    const query = 'INSERT INTO examperiod (name,end,start,status) VALUES (?, ?, ?, ?)';
    const result = await db.query(query, [examperiod.name]);
    let err = 'Error in creating examperiod';
    if (result.affectedRows) {
        err = 'Examperiod created successfully';
    }
    return { err };
}

async function update(id, examperiod) {
    const query = 'UPDATE examperiod SET name = ?, end = ?, start = ?, status = ? WHERE id = ?';
    const result = await db.query(query, [examperiod.name, examperiod.end, examperiod.start, examperiod.status, id]);
    let err = 'Error in updating examperiod';
    if (result.affectedRows) {
        err = 'Examperiod updated successfully';
    }
    return { err };
}

async function remove(id) {
    const query = 'DELETE FROM examperiod WHERE id = ?';
    const result = await db.query(query, [id]);
    let err = 'Error in deleting examperiod';
    if (result.affectedRows) {
        err = 'Examperiod deleted successfully';
    }
    return { err };
}

module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove
}
