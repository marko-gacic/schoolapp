const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const examperiodService = require('../service/examperiodService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await examperiodService.getAll());
    } catch (err) {
        console.error(`Error while getting examperiods `, err.message);
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
        res.json(await examperiodService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting examperiods `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await examperiodService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting examperiod `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await examperiodService.create(req.body));
    } catch (err) {
        console.error(`Error while creating examperiod `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await examperiodService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating examperiod `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await examperiodService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting exam period `, err.message);
        next(err);
    }
});

router.get('/active-exam-period', (req, res) => {
    examService.getActiveExamPeriod((err, examPeriod) => {
        if (err) {
            return res.status(500).json({ message: 'Error finding exam period' });
        }

        if (examPeriod) {
            return res.status(200).json(examPeriod);
        }

        return res.status(404).json({ message: 'No active exam period' });
    });
});

module.exports = router;