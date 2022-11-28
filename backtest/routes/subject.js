const express = require('express');
const router = express.Router();
const subjectService = require('../service/subjectService');
const { isLoggedIn } = require('../auth/authMiddleware');
router.use(isLoggedIn);

router.get('/', async function (req, res, next) {
    try {
        res.json(await subjectService.getAll());
    } catch (err) {
        console.error(`Error while getting subjects `, err.message);
        next(err);
    }
});

router.get('/page', async function (req, res, next) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 5;
        const orderBy = req.query.orderBy ? req.query.orderBy : 'id';
        const order = req.query.order ? req.query.order : 'asc';

        console.log('page', req.query.page, page, size, orderBy, order);
        res.json(await subjectService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting subjects `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await subjectService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting subject `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await subjectService.create(req.body));
    } catch (err) {
        console.error(`Error while creating subject `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await subjectService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating subject `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await subjectService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting subject `, err.message);
        next(err);
    }
}
);

module.exports = router;
