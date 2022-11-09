var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Get dashboard');
});

router.get('/page',  function (req, res, next) {
    res.send('Get dashboard page');
});

router.post('/', function (req, res, next) {
    res.send('Post dashboard');
});

router.put('/', function (req, res, next) {
    res.send('Put dashboard');
});

router.delete('/:id', function (req, res, next) {
    res.send('Delete dashboard'+req.params.id);
});

module.exports = router;