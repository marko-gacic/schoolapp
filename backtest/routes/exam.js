const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const examService = require('../service/examService');


router.get('/', async function (req, res, next) {
    try {
        res.json(await examService.getAll());
    } catch (err) {
        console.error(`Error while getting exams `, err.message);
        next(err);
    }
});

router.get('/page', async function (req, res, next) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 5;
        const orderBy = req.query.orderBy ? req.query.orderBy : 'id';
        const order = req.query.order ? req.query.order : 'ASC';

        console.log('page', req.query.page, page, size, orderBy, order);
        res.json(await examService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting exams `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await examService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting exam `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await examService.create(req.body));
    } catch (err) {
        console.error(`Error while creating exam `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await examService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating exam `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await examService.delete(req.params.id));
    } catch (err) {
        console.error(`Error while deleting exam `, err.message);
        next(err);
    }
});

module.exports = router;