process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../app');
var ImpLC = require("../models/impLC");

var should = chai.should();
chai.use(chaiHttp);


describe('impLCs', function() {

  ImpLC.collection.drop();

  beforeEach(function(done){
    var newImpLC = new ImpLC({
      lcNum: '123',
      customer: 'Anand',
      benefBank: 'SBI',
      amount: '1000'
    });
    newImpLC.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    ImpLC.collection.drop();
    done();
  });

  it('should list ALL ImpLCs on /ImpLCs GET', function(done) {
    chai.request(server)
      .get('/users/impLC')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('lcNum');
        res.body[0].should.have.property('customer');
        res.body[0].lcNum.should.equal('123');
        res.body[0].customer.should.equal('Anand');
        done();
      });
  });


  it('should list a SINGLE ImpLC on /ImpLC/<id> GET', function(done) {
      var newImpLC = new ImpLC({
      lcNum: '456',
      customer: 'Amit',
      benefBank: 'Chase',
      amount: '10000'
      });
      newImpLC.save(function(err, data) {
        chai.request(server)
          .get('/users/impLC/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('lcNum');
            res.body.should.have.property('customer');
            res.body.lcNum.should.equal('456');
            res.body.customer.should.equal('Amit');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });

  it('should add a SINGLE ImpLC on /ImpLCs POST', function(done) {
    chai.request(server)
      .post('/ImpLCs')
      .send({'name': 'Java', 'lastName': 'Script'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
  });

  it('should update a SINGLE ImpLC on /ImpLC/<id> PUT', function(done) {
    chai.request(server)
      .get('/ImpLCs')
      .end(function(err, res){
        chai.request(server)
          .put('/ImpLC/'+res.body[0]._id)
          .send({'name': 'Spider'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
        });
      });
  });

  it('should delete a SINGLE ImpLC on /ImpLC/<id> DELETE', function(done) {
    chai.request(server)
      .get('/ImpLCs')
      .end(function(err, res){
        chai.request(server)
          .delete('/ImpLC/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('name');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.name.should.equal('Bat');
            done();
        });
      });
  });

});