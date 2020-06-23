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
            let [rows] = await DB.query('select author, title, isbn, released_date from books');
            return rows;

        } catch(err) {
            return { error: err.message };
        }
    }

    async single(isbn) {
        try {

            // fetch single data
            let [rows] = await DB.query('select author, title, isbn, released_date from books where isbn = ?',[isbn]);
            return rows;

        } catch(err) {
            return { error: err.message };
        }
    }

    async create(payload) {
        try{

            // validate the payload
            if(!payload.author || payload.author.length === 0) {
                throw new Error('author is required')
            }

            // validate title
            if(!payload.title || payload.title.length === 0) {
                throw new Error('title is required')
            }

            // validate isbn
            if(!payload.isbn || payload.isbn.length === 0) {
                throw new Error('isbn is required');
            }

            // create new payload entry with payload dta
            let [result] = await DB.query('insert into books (author, title, isbn, released_date) values (?, ?, ?, ?)', [payload.author, payload.title, payload.isbn, payload.released_date]);
            result = await this.single(payload.isbn);
            return result;

        } catch(err) {
            return { error: err.message };
        }
    }

    async update(isbn, payload) {
        try{

            // validate the payload
            if(!payload.author || payload.author.length === 0) {
                throw new Error('author is required')
            }

            // validate title
            if(!payload.title || payload.title.length === 0) {
                throw new Error('title is required')
            }

            // validate isbn
            if(!payload.isbn || payload.isbn.length === 0) {
                throw new Error('isbn is required');
            }

            // update books with the payload data
            await DB.query('update books set title=?, author=?, isbn=?, released_date=? where isbn=?',[payload.title, payload.author, payload.isbn, payload.released_date, isbn]);
            let result = await this.single(payload.isbn);
            return result;

        } catch(err) {
            return { error: err.message };
        }
    }

    async delete(isbn) {
        try{

            // update deleted date with the current date
            await DB.query('delete from books where isbn=?',[isbn]);
            return 'item removed';

        } catch(err) {
            return { error: err.message };
        }
    }

}

const instance = new Book();
Object.freeze(instance);

module.exports = instance;