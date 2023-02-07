const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const { db } = require('../config');
const router = express.Router();
router.use(isLoggedIn);
const markService = require('../service/marksService');
const studentService = require('../service/studentService');

router.get('/', function (req, res) {
    let currentDate = new Date();
    let examDate = new Date("2022-12-01");
    let diff = Math.abs(examDate - currentDate);
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (currentDate > examDate) {
        res.send("Exam date has passed");
    } else {
        res.send("Exam date is in " + days + " days");
    }

});

router.get('/page', async function (req, res, next) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 5;
        const orderBy = req.query.orderBy ? req.query.orderBy : 'id';
        const order = req.query.order ? req.query.order : 'ASC';
        console.log('page', req.query.page, page, size, orderBy, order);
        res.json(await markService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting marks `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await markService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting mark `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    const { mark, date, student, exam, professor, examperiod } = req.body;
    const subject = db.getSubjectIdExamId(exam);
    if (!db.doesProfessorTeachSubject(professor, subject)) {
        res.send("Professor does not teach this subject");
        return;
    }

    const newMark = { mark, date, student, exam, professor, examperiod };
    try {
        res.json(await markService.create(newMark));
    } catch (err) {
        console.error(`Error while creating mark `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await markService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating mark `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await markService.delete(req.params.id));
    } catch (err) {
        console.error(`Error while deleting mark `, err.message);
        next(err);
    }
});

router.get('/subject-with-highest-average-grade', async function (req, res, next) {
    try {
        res.json(await studentService.getSubjectWithHighestAverageGrade());
    } catch (err) {
        console.error(`Error while getting subject with highest average grade `, err.message);
        next(err);
    }
});

module.exports = router;


