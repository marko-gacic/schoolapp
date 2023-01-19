const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../pdf');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post('/literature', upload.single('pdf'), (req, res) => {
    const { name, authors, issn, professor_id } = req.body;
    const sql = `INSERT INTO literature (name, authors, issn, professor_id) 
    VALUES ('${name}', '${authors}', '${issn}', '${professor_id}')`;
    connection.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            res.json({ message: 'Literature added.' });
        }
    });
});

router.get('/literature', (req, res) => {
    const sql = 'SELECT * FROM literature';
    connection
        .query(sql, (error
            , results) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.json(results);
            }
        });
});

router.get('/literature/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM literature WHERE id = ${id}`;
    connection.query(sql
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.json(results);
            }
        });
});

router.put('/literature/:id', (req, res) => {
    const id = req.params.id;
    const { name, authors, issn, professor_id } = req.body;
    const sql = `UPDATE literature SET name = '${name}', authors = '${authors}', issn = '${issn}', professor_id = '${professor_id}' WHERE id = ${id}`;
    connection.query(sql
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.json({ message: 'Literature updated.' });
            }
        });
});

router.delete('/literature/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM literature WHERE id = ${id}`;
    connection
        .query
        (sql, (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.json({ message: 'Literature deleted.' });
            }
        });
});

module.exports = router;


