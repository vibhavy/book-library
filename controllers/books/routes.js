let Router = require('router');
let router = Router();
let book = require('./Book');



// get all books from the library 
router.get('/', async function (req, res) {

    let response = await book.all();
    response = {
        data: response,
        code: 200,
    };

    if(response.data.error)
        response.code = 400;

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// get single book from the library
router.get('/:isbn', async function (req, res) {

    let response = await book.single(req.params.isbn);
    response = {
        data: response,
        code: 200,
    };

    if(response.data.error)
        response.code = 400;

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// create new book entry
router.post('/', async function (req, res) {

    let response = await book.create(req.body);
    response = {
        data: response,
        code: 201,
    };

    if(response.data.error)
        response.code = 400;

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// update single book from the library
router.put('/:isbn', async function (req, res) {

    let response = await book.update(req.params.isbn, req.body);
    response = {
        data: response,
        code: 201,
    };

    if(response.data.error)
        response.code = 400;

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});

// delete single book from the library
router.delete('/:isbn', async function (req, res) {

    let response = await book.delete(req.params.isbn);
    response = {
        data: response,
        code: 200,
    };

    if(response.data.error)
        response.code = 400;

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response));

});


module.exports = router;