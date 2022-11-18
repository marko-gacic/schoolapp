const db = require('../db/db');

// GET all subjects
async function getAll() {
    const data = await db.any('SELECT * FROM subjects ORDER BY id');
    return data;
}


async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM subjects';
    const [total] = await db.any(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? lastPage : page;
    const offset = (page - 1) * size;
    const query = `SELECT * FROM subjects ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`;
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
    const data = await db.any(`SELECT * FROM subjects WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };
}

async function create(subject) {
    const data = await db.any(`INSERT INTO subjects (name, description,noOfESP, yearOfStudy, semester, ) VALUES ('${subject.name}', '${subject.description}', '${subject.noOfESP}', '${subject.semester}')`);
    let err = 'Error in creating subject';
    if (data.affectedRows) {
        err = 'Subject created successfully';
    }
    return { err };
}

async function update(id, subject) {
    const data = await db.any(`UPDATE subjects SET name = '${subject.name}', description = '${subject.description}', noOfESP = '${subject.noOfESP}', yearOfStudy = '${subject.yearOfStudy}', semester = '${subject.semester}' WHERE id = ${id}`);
    let err = 'Error in updating subject';
    if (data.affectedRows) {
        err = 'Subject updated successfully';
    }
    return { err };
}

async function remove(id) {
    const data = await db.any(`DELETE FROM subjects WHERE id = ${id}`);
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