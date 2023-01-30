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
        const newobj = { ...man, city: { zip_code: man.city, name: man.cityName } };
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
    const query = "INSERT INTO student (indexNumber, indexYear, firstName, lastName, email, address, currentYearOfStudy, city) VALUES (?, ?, ?, ?, ?, ?,?,?)"
    const result
        = await
            db.query(query, [
                student.indexNumber,
                student.indexYear,
                student.firstName,
                student.lastName,
                student.email,
                student.address,
                student.currentYearOfStudy,
                student.city]);
    let err = 'Error in creating student';
    if (result.affectedRows) {
        err = 'Student created successfully';
    }
    return { err };
}

async function update(id, student) {
    const query = "UPDATE student SET indexNumber = ?, indexYear = ?, firstName = ?, lastName = ?, email = ?, address = ?, currentYearOfStudy = ?, city = ? WHERE id = ?";
    const result
        = await
            db.query(query, [
                student.indexNumber,
                student.indexYear,
                student.firstName,
                student.lastName,
                student.email,
                student.address,
                student.currentYearOfStudy,
                student.city,
                id]);
    let err = 'Error in updating student';
    if (result.affectedRows) {
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

async function filterData(filters) {
    let query = "SELECT * FROM student";
    let queryParams = [];
    if (filters.firstName) {
        query += " WHERE firstName LIKE ?";
        queryParams.push("%" + filters.firstName + "%");
    }
    if (filters.lastName) {
        if (queryParams.length > 0) {
            query += " AND";
        } else {
            query += " WHERE";
        }
        query += " lastName LIKE ?";
        queryParams.push("%" + filters.lastName + "%");
    }
    if (filters.indexYear) {
        if (queryParams.length > 0) {
            query += " AND";
        } else {
            query += " WHERE";
        }
        query += " indexYear = ?";
        queryParams.push(filters.indexYear);
    }
    if (filters.currentYearOfStudy) {
        if (queryParams.length > 0) {
            query += " AND";
        } else {
            query += " WHERE";
        }
        query += " currentYearOfStudy = ?";
        queryParams.push(filters.currentYearOfStudy);
    }
    if (filters.city) {
        if (queryParams.length > 0) {
            query += " AND";
        } else {
            query += " WHERE";
        }
        query += " city = ?";
        queryParams.push(filters.city);
    }
    if (filters.indexNumber) {
        if (queryParams.length > 0) {
            query += " AND";
        } else {
            query += " WHERE";
        }
        query += " indexNumber LIKE ?";
        queryParams.push("%" + filters.indexNumber + "%");
    }



}


module.exports = {
    getAll,
    getByPage,
    get,
    create,
    update,
    remove,
    filterData
}