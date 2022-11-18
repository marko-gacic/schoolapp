const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT zip_code, name FROM city ORDER BY name');
    return data;
}

async function getByPage(page, size, orderBy, order) {
	console.log(page, size, orderBy, order);
	const queryTotal = 'SELECT COUNT(*) as totalItems FROM city'
	const [total] = await db.query(queryTotal);
	const lastPage = Math.ceil(total.totalItems/size);
	page = page <=lastPage ? page : lastPage;
	const offset = (page-1)  * size;
	const query = `SELECT zip_code, name FROM city  ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`
	console.log('query:', query);
    const data = await db.query(query);
	
	const pageResponse = {
		content: data,
		totalItems: total.totalItems,
		page: page,
		size: size
	}
	
    return pageResponse;
}

async function get(id) {
    const data = await db.query(`SELECT zip_code, name FROM city WHERE zip_code = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let message = `Invalid city with zip code = ${id}`;
    return { message };
}

async function create(city) {
    const result = await db.query(`INSERT INTO city(zip_code, name) VALUES (${city.zip_code}, '${city.name}')`);
    let message = 'Error in creating city!';
    if (result.affectedRows) {
        message = 'City is successfully created!';
    }
    return { message };
}

async function update(id, city) {
    const result = await db.query(`UPDATE city SET name = '${city.name}' WHERE zip_code = ${id}`);
    let message = 'Error in updating city!';
    if (result.affectedRows) {
        message = 'City is successfully updated!';
    }
    return { message };
}

async function remove(id) {
    const result = await db.query(`DELETE FROM city WHERE zip_code = ${id}`);
    let message = 'Error in deleting city!';
    if (result.affectedRows) {
        message = 'City is successfully deleted!';
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