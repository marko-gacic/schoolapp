const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM marks ORDER BY id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM marks'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `SELECT marks.*, 
    student.firstName as studentName,
        professor.firstName as professorName,
        subject.name as subjectName,
        examperiod.periodName as examperiodName
        FROM marks
    left JOIN student ON marks.student = student.id
    left JOIN professor ON marks.professor = professor.id
    left JOIN subject ON marks.subject = subject.id
    left JOIN examperiod ON marks.examperiod = examperiod.id
    ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`;
    let data = await db.query(query);

    data = data.map(marks => {
        const newobj = { ...marks, student: { id: marks.student, name: marks.studentName } };
        delete newobj.studentName;
        return newobj;
    });

    data = data.map(marks => {
        const newobj = { ...marks, professor: { id: marks.professor, name: marks.professorName } };
        delete newobj.professorName;
        return newobj;
    });

    data = data.map(marks => {
        const newobj = { ...marks, subject: { id: marks.subject, name: marks.subjectName } };
        delete newobj.subjectName;
        return newobj;
    });

    data = data.map(marks => {
        const newobj = { ...marks, examperiod: { id: marks.examperiod, name: marks.periodName } };
        delete newobj.examperiodName;
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
    const data = await db.query(`SELECT * FROM marks WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };
}

async function create(marks) {
    const data = await db.query(`INSERT INTO marks (student, professor, subject, examperiod, mark) VALUES ('${marks.student}', '${marks.professor}', '${marks.subject}', '${marks.examperiod}', '${marks.mark}')`);
    if (data && data.affectedRows > 0) {
        return data.insertId;
    }
    let err = `Invalid marks ${marks}`;
    return { err };
}

async function update(id, marks) {
    const data = await db.query(`UPDATE marks SET student = '${marks.student}', professor = '${marks.professor}', subject = '${marks.subject}', examperiod = '${marks.examperiod}', mark = '${marks.mark}' WHERE id = ${id}`);
    if (data && data.affectedRows > 0) {
        return data;
    }
    let err = `Invalid marks ${marks}`;
    return { err };
}

async function remove(id) {
    const data = await db.query(`DELETE FROM marks WHERE id = ${id}`);
    if (data && data.affectedRows > 0) {
        return data;
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
    remove
}

