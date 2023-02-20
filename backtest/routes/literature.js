const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const literatureService = require('../service/literatureService');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});


router.get('/', async function (req, res, next) {
    try {
        res.json(await literatureService.getAll());
    } catch (err) {
        console.error(`Error while getting literature `, err.message);
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
        res.json(await literatureService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.error(`Error while getting literature `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await literatureService.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting literature `, err.message);
        next(err);
    }
});

router.post('/', upload.single('file'), async function (req, res, next) {
    console.log('req.file', req.file);
    const file = req.file;
    if (file)
        req.body.file = file.filename;
    try {
        res.json(await literatureService.create(req.body, req.file));
    } catch (err) {
        console.error(`Error while creating literature `, err.message);
        next(err);
    }
});



router.put('/:id', async function (req, res, next) {
    try {
        res.json(await literatureService.update(req.params.id));
    } catch (err) {
        console.error(`Error while updating literature `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await literatureService.delete(req.params.id));
    } catch (err) {
        console.error(`Error while deleting literature `, err.message);
        next(err);
    }
});

router.get('/download/:id', async function (req, res, next) {
    try {
        const file = await literatureService.get(req.params.id);
        res.download(file.originalname);
    } catch (err) {
        console.error(`Error while downloading literature `, err.message);
        next(err);
    }
});



module.exports = router;
