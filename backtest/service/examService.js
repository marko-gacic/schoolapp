const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM exam ORDER BY id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM exam'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `SELECT exam.*, 
    subject.name as subjectName, professor.firstName as professorName, 
    examperiod.periodName as examperiodName FROM exam 
    INNER JOIN subject ON exam.subject = subject.id 
    INNER JOIN professor ON exam.professor = professor.id 
    INNER JOIN examperiod ON exam.examperiod = examperiod.id
    ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`;
    let data = await db.query(query);

    data = data.map(exam => {
        const newobj = { ...exam, subject: { id: exam.subject, name: exam.subjectName } };
        delete newobj.subjectName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, professor: { id: exam.professor, name: exam.professorName } };
        delete newobj.professorName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, examperiod: { id: exam.examperiod, name: exam.periodName } };
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
    const data = await db.query(`SELECT * FROM exam WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };
}

async function create(exam) {
    const query = ` INSERT INTO exam(date, subject, professor, examperiod) VALUES ( '${new Date(exam.date).toISOString().split('T')[0]}', ${exam.subject}, ${exam.professor}, ${exam.examPeriod})`;
    const result = await db.query(query);
    console.log(result);
    if (result.affectedRows) {
        message = 'Exam created successfully';
    }
    return { message, id: result.insertId };

}

async function update(id, exam) {
    const query = "UPDATE exam SET date = ?, subject = ?, professor = ?, examPeriod = ? WHERE id = ?"
    const result = await db.query(query, [new Date(exam.date).toISOString().split('T')[0], exam.subject, exam.professor, exam.examPeriod, id]);
    let message = 'Error in updating exam';
    if (result.affectedRows) {
        message = 'Exam updated successfully';
    }
    return { message };
}


async function remove(id) {
    const data = await db.query(`DELETE FROM exam WHERE id = ${id}`);
    let message = 'Error in deleting exam';
    if (data.affectedRows) {
        message = 'Exam deleted successfully';
    }
    return { message };

}

module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove
}
