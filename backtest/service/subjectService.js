const db = require('../db/db');

// GET all subjects
async function getAll() {
    const data = await db.query('SELECT * FROM subject ORDER BY id');
    return data;
}


async function getByPage(page, size, orderBy, order) {
    console.log(page, size, orderBy, order);
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM subject';
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? lastPage : page;
    const offset = (page - 1) * size;
    const query = `SELECT id, name, description, noOfESP, yearOfStudy, semester FROM subject ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`;
    const data = await db.query(query);

    const pageResponse = {
        content: data,
        totalItems: total.totalItems,
        page: page,
        size: size,
    }

    return pageResponse;
}

async function get(id) {
    const data = await db.query(`SELECT * FROM subject WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let message = `Invalid id ${id}`;
    return { message };
}

async function create(subject) {
    const query = 'INSERT INTO subject (name, description, noOfESP, yearOfStudy, semester) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(query, [subject.name, subject.description, subject.noOfESP, subject.yearOfStudy, subject.semester]);
    let err = 'Error in creating subject';
    if (result.affectedRows) {
        err = 'Subject created successfully';
    }
    return { err };
}

async function update(id, subject) {
    const query = 'UPDATE subject SET name = ?, description = ?, noOfESP = ?, yearOfStudy = ?, semester = ? WHERE id = ?';
    const result
        = await db.query(query
            , [subject.name, subject.description, subject.noOfESP, subject.yearOfStudy, subject.semester, id]);
    let err = 'Error in updating subject';
    if (result.affectedRows) {
        err = 'Subject updated successfully';
    }
    return { err };
}

async function remove(id) {
    const data = await db.query(`DELETE FROM subject WHERE id = ${id}`);
    let err = 'Error in deleting subject';
    if (data.affectedRows) {
        err = 'Subject deleted successfully';
    }
    return { err };
}

module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove,
};