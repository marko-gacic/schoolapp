const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM professor order by id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    console.log('page',page,size,orderBy,order);
    const queryTotal = 'SELECT count(*) as totalItems FROM professor';
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `select professor.*, city.name as cityName from professor inner join city on professor.city_id = city.id order by ${orderBy} ${order} limit ${size} offset ${offset}`;
    console.log(query);
    let data = await db.query(query);

    data = data.map(man => {
        const newobj = {...man,city:{postalCode: man.city, name: man.cityName}};
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
    const data = await db.query(`select * from professor where id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let err = `Invalid id ${id}`;
    return { err };
    
}

async function create(professor) {
    const query = `insert into professor (firstName,lastName,email,address,phone,relocationDate,city_id,title) values ('${professor.firstName}','${professor.lastName}','${professor.email}','${professor.address}','${professor.phone}','${professor.relocationDate}','${professor.city_id}','${professor.title}')`;
    const result = await db.query(query);
    let err = 'Error in creating professor';
    if (result.affectedRows) {
        err = 'Professor created successfully';
    }
    return { err };
}

async function update(id, professor) {
    const result = await db.query(`update professor set firstName = '${professor.firstName}', lastName = '${professor.lastName}', email = '${professor.email}', address = '${professor.address}', phone = '${professor.phone}', relocationDate = '${professor.relocationDate}', city_id = '${professor.city_id}', title = '${professor.title}' where id = ${id}`);
    let err = 'Error in updating professor';
    if (result.affectedRows) {
        err = 'Professor updated successfully';
    }
    return { err };
}

async function remove(id) {
    const result = await db.query(`delete from professor where id = ${id}`);
    let err = 'Error in deleting professor';
    if (result.affectedRows) {
        err = 'Professor deleted successfully';
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
