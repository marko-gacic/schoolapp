const db = require('../db/db');
const fs = require('fs');
const path = require('path');



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

async function create(literature, file) {
    const { name, authors, issn, professor } = literature;
    const fileName = `${file.originalname}`;
    const filePath = path.join(__dirname, '..', 'public', fileName);
    const query = `INSERT INTO literature (name, authors, issn, professor,fileName) VALUES ('${name}', '${authors}', '${issn}', ${professor},'${fileName}')`;
    const result = await db.query(query);
    literature.id = result.insertId;
    return literature;
}

async function update(file, literature) {
    const { id, name, authors, issn, professor } = literature;
    let fileName = '';

    if (file) {
        fileName = file.originalname;
        const filePath = path.join(__dirname, `public/${fileName}`);
        fs.writeFileSync(filePath, file.buffer);
    } else {
        const currentLiterature = await get(id);
        fileName = currentLiterature.fileName;
    }

    const query = `UPDATE literature SET name = '${name}', authors = '${authors}', issn = '${issn}', professor = ${professor}, fileName = '${fileName}' WHERE id = ${id}`;
    await db.query(query);
    return literature;
}

async function remove(id) {
    const query = `DELETE FROM literature WHERE id = ${id}`;
    await db.query(query);
    return id;
}

async function download(id) {
    const data = await db.query(`SELECT * FROM literature WHERE id = ${id}`);
    if (data && data.length > 0) {
        const fileName = data[0].fileName;
        const filePath = path.join(__dirname, `../public/${fileName}`);
        const file = fs.readFileSync(filePath);
        return file;
    }
    let err = `Invalid id ${id}`;
    return { err };
}




module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove,
    download

}
