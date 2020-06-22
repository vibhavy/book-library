let finalhandler = require('finalhandler');
let http = require('http');
let bodyParser   = require('body-parser');
let Router = require('router');
let books = require('./controllers/books/routes');
 
let router = Router();
router.use(bodyParser.json())
router.use('/api/v1/books', books);
 
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
})
 
server.listen(3000);