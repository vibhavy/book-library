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
            let [rows] = await DB.query('select ID, author, title, isbn, released_date from books where deleted_date is null');
            return rows;

        } catch(err) {
            return [];
        }
    }

    async single(id) {
        try {

            // fetch single data
            let [rows] = await DB.query('select ID, author, title, isbn, released_date from books where id = ? and deleted_date is null',[id]);
            return rows;

        } catch(err) {
            return [];
        }
    }

    async create(payload) {
        try{

            // initialise empty response object
            let res = {};

            // validate the payload
            if(!payload.author || payload.author.length === 0) {
                res.error = 'author is required';
                return res;
            }

            // validate title
            if(!payload.title || payload.title.length === 0) {
                res.error = 'title is required';
                return res;
            }

            // validate isbn
            if(!payload.isbn || payload.isbn.length === 0) {
                res.error = 'isbn is required';
                return res;
            }

            // create new payload entry with payload dta
            let [result] = await DB.query('insert into books (author, title, isbn, released_date) values (?, ?, ?, ?)', [payload.author, payload.title, payload.isbn, payload.released_date]);
            res = await this.single(result.insertId);
            return res;

        } catch(err) {
            return [];
        }
    }

    async update(id, payload) {
        try{

            // initialise empty response object
            let res = {};

            // validate the payload
            if(!payload.author || payload.author.length === 0) {
                res.error = 'author is required';
                return res;
            }

            // validate title
            if(!payload.title || payload.title.length === 0) {
                res.error = 'title is required';
                return res;
            }

            // validate isbn
            if(!payload.isbn || payload.isbn.length === 0) {
                res.error = 'isbn is required';
                return res;
            }

            // update books with the payload data
            await DB.query('update books set title=?, author=?, isbn=?, released_date=? where id=?',[payload.title, payload.author, payload.isbn, payload.released_date, id]);
            res = await this.single(id);
            return res;

        } catch(err) {
            return [];
        }
    }

    async delete(id) {
        try{

            // get current date
            let today = new Date();
            today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            // update deleted date with the current date
            let [result] = await DB.query('update books set deleted_date=? where id=?',[today, id]);
            return [];

        } catch(err) {
            return [];
        }
    }

}

const instance = new Book();
Object.freeze(instance);

module.exports = instance;