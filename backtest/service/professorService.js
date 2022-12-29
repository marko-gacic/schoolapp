const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT * FROM professor order by id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    const queryTotal = 'SELECT count(*) as totalItems FROM professor';
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    console.log('page', page);
    const offset = (page - 1) * size;
    const query = `select professor.*,
     city.name  cityName, 
     title.titleName  titleName from professor 
     inner join city on professor.city = city.zip_code 
     left join title on professor.title = title.id   
     order by ${orderBy} ${order} limit ${size} offset ${offset}`;
    console.log(query);
    let data = await db.query(query);
    console.log('data', data);
    data = data.map(man => {
        const city = { ...man, city: { zip_code: man.city, name: man.cityName } };
        delete city.cityName;
        return city;
    });

    data = data.map(man => {
        const newTitle = { ...man, title: { id: man.title, name: man.titleName } };
        delete newTitle.titleName;
        return newTitle;
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
    const query = "INSERT INTO professor (firstName, lastName, phone, relocationDate, city, address, email, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    console.log(query);
    const result = await db.query(query, [
        professor.firstName,
        professor.lastName,
        professor.phone,
        new Date(professor.relocationDate).toISOString().split('T')[0],
        professor.city,
        professor.address,
        professor.email,
        professor.title]);
    let err = 'Error in creating professor';
    console.log(query);
    if (result.affectedRows) {
        err = 'Professor created successfully';
    }
    return { err };
}

async function update(id, professor) {
    const query = "UPDATE professor SET firstName = ?, lastName = ?, phone = ?, relocationDate = ?, city = ?, address = ?, email = ? WHERE id = ?";
    const result
        = await db.query(query, [
            professor.firstName,
            professor.lastName,
            professor.phone,
            new Date(professor.relocationDate).toISOString().split('T')[0],
            professor.city,
            professor.address,
            professor.email, id]);
    let err = 'Error in updating professor';
    if (result.affectedRows) {
        err = 'Professor updated successfully';
    }
    return { err };
}

async function remove(id) {
    const result = await db.query(`DELETE FROM professor WHERE id = ${id}`);
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