let Router = require('router');
let router = Router();
let book = require('./Book');

// get all books from the library 
router.get('/', async function (req, res) {

    let response = await book.all(req);
    response = {
        data: response,
        code: 200,
    };
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// get single book from the library
router.get('/:id', async function (req, res) {

    let response = await book.single(req.params.id);
    response = {
        data: response,
        code: 200,
    };
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// create new book entry
router.post('/', async function (req, res) {

    let response = await book.create(req.body);
    response = {
        data: response,
        code: 200,
    };
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// update single book from the library
router.put('/:id', async function (req, res) {

    let response = await book.update(req.params.id, req.body);
    response = {
        data: response,
        code: 200,
    };
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// delete single book from the library
router.delete('/:id', async function (req, res) {

    let response = await book.delete(req.params.id);
    response = {
        data: response,
        code: 200,
    };
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});


module.exports = router;