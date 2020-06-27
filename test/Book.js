var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();

let ISBN = '433242343';
let baseUrl = '/api/v1/books';

chai.use(chaiHttp);
describe("Books", function(){

  it("Should Throw Validation Error", (done) => {
    let payload = {
      "title": "",
      "author": "",
      "isbn": "",
      "released_date": "20201002"
    };
    chai.request(server)
    .post(baseUrl)
    .send(payload)
    .end((err, result) => {
      result.body.code.should.eq(400);
      console.log("Errors:", result.body.data.error);
      done();
    });
  });

  it("Should add Books in DB", (done) => {
    let payload = {
      "title": "let me code you",
      "author": "Vibhav Yadav",
      "isbn": ISBN,
      "released_date": "2020-10-02"
    };
    chai.request(server)
    .post(baseUrl)
    .send(payload)
    .end((err, result) => {
      result.body.code.should.eq(201);
      console.log("Response Body:", result.body.data);
      done();
    });
  });

  it("Should return ISBN Unique Validation", (done) => {
    let payload = {
      "title": "let me code you",
      "author": "Vibhav Yadav",
      "isbn": ISBN,
      "released_date": "2020-10-02"
    };
    chai.request(server)
    .post(baseUrl)
    .send(payload)
    .end((err, result) => {
      result.body.code.should.eq(400);
      console.log("Error:", result.body.data.error);
      done();
    });
  });

  it ("Should Fetch all the Books", (done)=>{
    chai.request(server)
    .get(baseUrl)
    .end((err, result)=>{
        result.body.code.should.eq(200);
        console.log ("Got",result.body.data.length, " docs");
        done();
    });
  });

  it ("Should Fetch Particular Book only", (done)=>{
    chai.request(server)
    .get(`${baseUrl}/${ISBN}`)
    .end((err, result)=>{                
        result.body.code.should.eq(200);
        console.log(`Fetched Particlar Book with ISBN: ${ISBN}`, result.body.data);
        done();
    });
  });

  it ("Should Update Partcular Book Only", (done)=>{
    let updatedBook = {
      "isbn": ISBN,
      "title": "vibhav sold the monk ferarri",
      "author": "monk",
      "released_date": "2020-03-10"
    }
    chai.request(server)
    .put(`${baseUrl}/${ISBN}`)
    .send(updatedBook)
    .end((err, result)=>{               
      result.body.code.should.eq(201);
      console.log(`Updated Particlar Book with ISBN: ${ISBN}`, result.body.data);
      done();
    });
  });

  it ("should check data updated in DB", (done)=>{
    chai.request(server)
    .get(`${baseUrl}/${ISBN}`)
    .end((err, result)=>{                 
      result.body.code.should.eq(200);
      result.body.data.isbn.should.eq(ISBN);
      result.body.data.author.should.eq("monk");
      console.log(`Fetched Particlar Book with ISBN: ${ISBN}`, result.body.data)  ;  
      done();;
    });
  });

  it("Should Delete Particular Book", (done)=>{
    chai.request(server)
    .delete(`${baseUrl}/${ISBN}`)
    .end((err, result)=>{               
      result.body.code.should.eq(200);           
      console.log(`Deleted Particlar Book with ISBN: ${ISBN}`, result.body.data);    
      done();
    });
  });

});
    

    