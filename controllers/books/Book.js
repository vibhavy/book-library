const DB = require('../../db/mysql/connection');

class Book {
    constructor() {
        if(!Book.instance)
            Book.instance = this;       
        return Book.instance;
    }

    async all() {
        try {

            // fetch all books
            let [rows] = await DB.query('select author, title, isbn, date_format(released_date,"%Y-%m-%d") as released_date from books');
            return rows;

        } catch(err) {
            return { error: err.message };
        }
    }

    async single(isbn) {
        try {

            // fetch single data
            let [rows] = await DB.query('select author, title, isbn, date_format(released_date,"%Y-%m-%d") as released_date from books where isbn = ?',[isbn]);
            if(rows.length > 0) {
                rows = rows[0];
                return rows;
            }

            // when no result is found
            throw new Error('unknown ISBN provided');

        } catch(err) {
            return { error: err.message };
        }
    }

    async create(payload) {
        try{

            // validate the payload
            let validate = this.validation(payload);
            if(validate.error.length > 0)
                return { error: validate.error };
           
            // create new payload entry with payload dta
            await DB.query('insert into books (author, title, isbn, released_date) values (?, ?, ?, ?)', [payload.author, payload.title, payload.isbn, payload.released_date]);
            return 'item added';

        } catch(err) {
            return { error: err.message };
        }
    }

    async update(isbn, payload) {
        try{

            // check if the isbn exists or not
            let book = await this.single(isbn);
            if(book.error) {
                throw new Error(book.error);
            }

            // validate the payload
            let validate = this.validation(payload);
            if(validate.error.length > 0)
                return { error: validate.error };
    
            // update books with the payload data
            await DB.query('update books set title=?, author=?, isbn=?, released_date=? where isbn=?',[payload.title, payload.author, payload.isbn, payload.released_date, isbn]);
            return 'item updated';

        } catch(err) {
            return { error: err.message };
        }
    }

    async delete(isbn) {
        try{

            // check if the isbn exists or not
            let book = await this.single(isbn);
            if(book.error) {
                throw new Error(book.error);
            }

            // update deleted date with the current date
            await DB.query('delete from books where isbn=?',[isbn]);
            return 'item removed';

        } catch(err) {
            return { error: err.message };
        }
    }

    validation(payload) {

        // initialize error array
        let errors = [];

        try {

            // validate the payload
            if(!payload.author || payload.author.length === 0)
                errors.push('author is required');

            // validate title
            if(!payload.title || payload.title.length === 0)
                errors.push('title is required');

            // validate isbn
            if(!payload.isbn || payload.isbn.length === 0)
                errors.push('isbn is required');

            // validate released_date if present
            if(payload.released_date && payload.released_date.length > 0) {
                let date = payload.released_date;
                let dateArr = date.split('-');
                if(dateArr.length === 0 || date.length < 10) {
                    errors.push('invalid date format for released_date, required format(Y-m-d)');
                }
            }

        } catch (err) {
            errors.push(err.message);
        }
    
        // return errror
        return { error: errors }

    }

}

const instance = new Book();
Object.freeze(instance);

module.exports = instance;