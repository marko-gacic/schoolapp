const db = require('../db/db');


async function getAll() {
    const data = await db.query('SELECT * FROM literature ORDER BY id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM literature'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `SELECT literature.*,
    professor.firstName as professorName
    FROM literature
    left JOIN professor ON literature.professor = professor.id
    ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`;
    let data = await db.query(query);
    console.log(query);

    data = data.map(exam => {
        const newobj = { ...exam, professor: { id: exam.professor, name: exam.professorName } };
        delete newobj.professorName;
        return newobj;
    });

    const pageResponse = {
        content: data,
        totalItems: total.totalItems,
        page: page,
        size: size,
    }

    return pageResponse;

}

async function get(id) {
    const data = await db.query(`SELECT * FROM literature WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };



}

async function create(literature) {
    const { name, authors, issn, professor, fileName } = literature;
    const query = `INSERT INTO literature (name, authors, issn, professor,fileName) VALUES ('${name}', '${authors}', '${issn}', ${professor},'${fileName}')`;
    const result = await db.query(query);
    literature.id = result.insertId;
    return literature;
}

async function update(literature) {
    const { id, name, authors, issn, professor, fileName } = literature;
    const query = `UPDATE literature SET name = '${name}', authors = '${authors}', issn = '${issn}', professor = ${professor},fileName='${fileName}' WHERE id = ${id}`;
    await db.query(query);
    return literature;
}

async function remove(id) {
    const query = `DELETE FROM literature WHERE id = ${id}`;
    await db.query(query);
    return id;
}

async function downloadPdf(id) {
    const data = await get(id);
    if (!data.err) {
        const fileName = data.fileName;
        const pdfData = data.pdf;
        const blob = new Blob([pdfData], { type: '/pdf' });
        saveAs(blob, fileName);
    } else {
        console.error(data.err);
    }
}

module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove,
    downloadPdf
}
