const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const literatureService = require('../service/literatureService');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../pdf');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


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

router.post('/', upload.single('pdf'), async function (req, res, next) {
    try {
        res.json(await literatureService.create(req.body));
    } catch (err) {
        console.error(`Error while creating literature `, err.message);
        next(err);
    }
});


router.put('/:id', async function (req, res, next) {
    try {
        res.json(await literatureService.update(req.params.id, req.body));
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



module.exports = router;
