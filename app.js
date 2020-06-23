let finalhandler = require('finalhandler');
let http = require('http');
let bodyParser   = require('body-parser');
let Router = require('router');
let books = require('./controllers/books/routes');
 
let router = Router();
router.use(bodyParser.json())
router.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('welcome to LIbrary');
});
router.use('/api/v1/books', books);
 
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
})
 
server.listen(process.env.PORT || 3000);

module.exports = server;