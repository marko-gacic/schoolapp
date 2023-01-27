const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const professorService = require('../service/professorService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await professorService.getAll());
    } catch (err) {
        console.error(`Error while getting professors `, err.message);
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
        res.json(await professorService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting professors `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await professorService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting professor `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await professorService.create(req.body));
    } catch (err) {
        console.error(`Error while creating professor `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await professorService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating professor `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await professorService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting professor `, err.message);
        next(err);
    }
});

module.exports = router;
