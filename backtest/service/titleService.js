const db = require('../db/db');

async function getAll() {
    const data = await db.query('SELECT id, titleName FROM title ORDER BY id');
    return data;
}

async function getByPage(page, size, orderBy, order) {
    console.log(page, size, orderBy, order);
    const queryTotal = 'SELECT COUNT(*) as totalItems FROM title'
    const [total] = await db.query(queryTotal);
    const lastPage = Math.ceil(total.totalItems / size);
    page = page <= lastPage ? page : lastPage;
    const offset = (page - 1) * size;
    const query = `SELECT id, titleName FROM tile  ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`
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
    const data = await db.query(`SELECT id, titleName FROM title WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let message = `Invalid id ${id}`;
    return { message };
}

async function create(title) {
    const result = await db.query(`INSERT INTO title(id, titleName) VALUES ( ${title.id}', '${title.titleName}')`);
    let err = 'Error in creating title';
    if (result.affectedRows) {
        err = 'Title created successfully';
    }
    return { err };
}

async function update(id, title) {
    const result = await db.query(`UPDATE title SET titleName = '${title.titleName}' WHERE id = ${id}`);
    let err = 'Error in updating title';
    if (result.affectedRows) {
        err = 'Title updated successfully';
    }
    return { err };
}

async function remove(id) {
    const query = 'DELETE FROM title WHERE id = ?';
    const result = await db.query
        (query, [id]);
    let err = 'Error in deleting title';
    if (result.affectedRows) {
        err = 'Title deleted successfully';
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