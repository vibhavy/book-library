# Book Library

Demo code for the basic implementation of Book class in the Library.

## Installation

Once cloned the project, use below code to install all the dependencies.

```bash
npm install
```

## Schema Setup

Database in Use: **MariaDB 10.4** or you can use **Mysql >= 5.6**
Run the below SQL code in your mysql server to create required Database: **library** and Table: **books**.

```sql
CREATE DATABASE IF NOT EXISTS library;
CREATE TABLE  IF NOT EXISTS library.books (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL,
  `isbn` varchar(45) NOT NULL,
  `released_date` date DEFAULT NULL,
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `isbn_unique` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

## Setup Config File

Create **config.js** file in the root on the project with below given parameters.

```Javascript
module.exports = {
    mysql: {
        host: '<host name>',
        username: '<user>',
        password: '<password>'
    }
};
```

## Usage

*To run the Tests* 
```bash
npm test
```

*To run the Code for Dev*
```bash
npm run dev
```

*To run the Code*
```bash
npm start
```

## API Documentation

Check the API Endpoints at: https://documenter.getpostman.com/view/1972175/SzzobwA3?version=latest

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)