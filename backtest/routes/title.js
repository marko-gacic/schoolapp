const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const titleService = require('../service/titleService');


router.get('/', async function (req, res, next) {
    try {
        res.json(await titleService.getAll());
    } catch (err) {
        console.log('Error while getting titles', err.message);
        next(err);
    }
});

router.get('/page', async function (req, res, next) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 5;
        const orderBy = req.query.orderBy ? req.query.orderBy : 'name';
        const order = req.query.order ? req.query.order : 'ASC';

        console.log('page', req.query, page, size, orderBy, order);
        res.json(await titleService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.log('Error while getting titles', err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await titleService.get(req.params.id));
    } catch (err) {
        console.log(`Error while getting title with id = ${id}`, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await titleService.create(req.body));
    } catch (err) {
        console.log('Error while creating new title', err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await titleService.update(req.params.id, req.body));
    } catch (err) {
        console.log('Error while updating existing title', err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await titleService.delete(req.params.id));
    } catch (err) {
        console.log('Error while deleting existing title', err.message);
        next(err);
    }
});

module.exports = router;


