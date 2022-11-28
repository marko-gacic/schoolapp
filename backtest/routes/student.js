const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const studentService = require('../service/studentService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await studentService.getAll());
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});

router.get('/page', async function (req, res, next) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 5;
        const orderBy = req.query.orderBy ? req.query.orderBy : 'id';
        const order = req.query.order ? req.query.order : 'asc';

        console.log('page',req.query.page,page,size,orderBy,order);
        res.json(await studentService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await studentService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting student with id = ${id} `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await studentService.create(req.body));
    } catch (err) {
        console.error(`Error while creating student `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await studentService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating student with id = ${id} `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await studentService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting student with id = ${id} `, err.message);
        next(err);
    }
});
 

module.exports = router;