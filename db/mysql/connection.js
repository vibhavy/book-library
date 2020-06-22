var mysql = require('mysql2');
var connection = mysql.createPool({
  host: 'rmcs.c3sevtfuia04.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'iqyD8QAgZTAs1jwf4MmD',
  database: 'library',
  multipleStatements: true
});

module.exports = connection.promise();