const db = require('../db/db');

// GET all subjects
async function getAll() {
    const data = await db.query('SELECT * FROM subject ORDER BY id');
    return data;
}


async function getByPage(page, size, orderBy, order) {
    console.log(page, size, orderBy, order);
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM subject'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `select subject.*,
        professor.firstName  professorName
        from subject
        left join professor on subject.professor = professor.id
        order by ${orderBy} ${order} limit ${size} offset ${offset}
        `
    console.log('query:', query);
    let data = await db.query(query);

    data = data.map(man => {
        const newobj = { ...man, professor: { id: man.professor, name: man.professorName } };
        delete newobj.professorName;
        return newobj;
    });


    const pageResponse = {
        content: data,
        totalItems: total.totalItems,
        page: page,
        size: size
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
    const query = 'INSERT INTO subject (name, description, noOfESP, yearOfStudy, semester, professor) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await db.query(query, [subject.name, subject.description, subject.noOfESP, subject.yearOfStudy, subject.semester]);
    let err = 'Error in creating subject';
    if (result.affectedRows) {
        err = 'Subject created successfully';
    }
    return { err };
}

async function update(id, subject) {
    const query = 'UPDATE subject SET name = ?, description = ?, noOfESP = ?, yearOfStudy = ?, semester = ?, professor = ? WHERE id = ?';
    const result
        = await db.query(query
            , [subject.name, subject.description, subject.noOfESP, subject.yearOfStudy, subject.semester, id, subject.professor]);
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