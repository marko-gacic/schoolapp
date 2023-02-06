const db = require('../db/db');


async function getAll() {
    const data = await db.query('SELECT * FROM marks order by id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT count(*) as totalItems FROM marks';
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    console.log('page', page);
    const offset = (page - 1) * size;
    const query = `select marks.*,
        student.firstName as  studentName,
        exam.id as  examName,
        professor.firstName as  professorName,
        examperiod.periodName as  examperiodName,
        subject.name as subjectName
        from marks
        left join student on marks.student = student.id
        left join exam on marks.exam = exam.id
        left join professor on marks.professor = professor.id
        left join examperiod on marks.examperiod = examperiod.id
        left JOIN subject ON marks.subject = subject.id
        order by ${orderBy} ${order} limit ${size} offset ${offset}`;

    console.log(query);
    let data = await db.query(query);
    console.log('data', data);

    data = data.map(exam => {
        const newobj = { ...exam, subject: { id: exam.subject, name: exam.subjectName } };
        delete newobj.subjectName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, student: { id: exam.student, name: exam.studentName } };
        delete newobj.studentName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, exam: { id: exam.exam, name: exam.examName } };
        delete newobj.examName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, professor: { id: exam.professor, name: exam.professorName } };
        delete newobj.professorName;
        return newobj;
    });

    data = data.map(exam => {
        const newobj = { ...exam, examperiod: { id: exam.examperiod, name: exam.examperiodName } };
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
    const data = await db.query(`select * from marks where id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };

}


async function create(mark) {
    const query = "INSERT INTO marks (mark,date,student, exam,professor, examperiod, subject) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
    console.log(query);
    const result = await db.query(query, [
        mark.mark,
        mark.date,
        mark.student,
        mark.exam,
        mark.professor,
        mark.examperiod,
        mark.subject
    ]);
    let message = 'Error in creating mark';
    if (result.affectedRows) {
        message = 'Mark created successfully';
    }
    return { message };

}

async function update(id, mark) {
    const query = `UPDATE marks SET mark = ?, date = ?, student = ?, exam = ?, professor = ?, examperiod = ?, subject=? WHERE id = ?`;
    console.log(query);
    const result = await db.query(query, [
        mark.mark,
        mark.date,
        mark.student,
        mark.exam,
        mark.professor,
        mark.examperiod,
        mark.subject,
        id
    ]);
}

async function remove(id) {
    const result = await db.query(`DELETE FROM marks WHERE id = ${id}`);
    let message = 'Error in deleting mark';
    if (result.affectedRows) {
        message = 'Mark deleted successfully';
    }
    return { message };
}

// get subject student with highest mark for each subject
async function getHighestMark() {
    const query = `select marks.*,
    student.firstName  studentName,
    exam.id  examName,
    professor.firstName  professorName,
    examperiod.periodName  examperiodName,
    subject.name  subjectName
    from marks
    left join student on marks.student = student.id
    left join exam on marks.exam = exam.id
    left join professor on marks.professor = professor.id
    left join examperiod on marks.examperiod = examperiod.id
    left join subject on marks.subject = subject.id
    where marks.mark = (select max(marks.mark) from marks where marks.subject = subject.id)`;
    console.log(query);
    try {
        const result = await runQuery(query);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}










module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove,
    getHighestMark
}