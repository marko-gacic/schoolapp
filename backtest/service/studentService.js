const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM student order by id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT COUNT(*) AS totalItems FROM student';
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `select student.*, city.name as cityName from student inner join city on student.city = city.zip_code order by ${orderBy} ${order} limit ${size} offset ${offset}`;
    console.log(query);
    let data = await db.query(query);

    data = data.map(man => {
        const newobj = {...man,city:{zip_code: man.city, name: man.cityName}};
        delete newobj.cityName;
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
    const data = await db.query(`select * from student where id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };
    
}

async function create(student) {
    const data = await db.query(`INSERT INTO student (indexNumber, indexYear,firstName,lastName,email,address,currentYearOfStudy,city) VALUES ('${student.indexNumber}', '${student.indexYear}','${student.firstName}','${student.lastName}','${student.email}','${student.address}','${student.currentYearOfStudy}','${student.city}')`);
    const result = await db.query(query);
    let err = 'Error in creating student';
    if (result.affectedRows) {
        err = 'Student created successfully';
    }
    return { err };
}

async function update(id, student) {
    const data = await db.query(`UPDATE student SET indexNumber = '${student.indexNumber}', indexYear = '${student.indexYear}', firstName = '${student.firstName}', lastName = '${student.lastName}', email = '${student.email}', address = '${student.address}', currentYearOfStudy = '${student.currentYearOfStudy}', city = '${student.city}' WHERE id = ${id}`);
    let err = 'Error in updating student';
    if (data.affectedRows) {
        err = 'Student updated successfully';
    }
    return { err };
}

async function remove(id) {
    const data = await db.query(`DELETE FROM student WHERE id = ${id}`);
    let err = 'Error in deleting student';
    if (data.affectedRows) {
        err = 'Student deleted successfully';
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