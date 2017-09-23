var expect = require('../../node_modules/chai/chai').expect;
var request = require('request');
var url = require('url');

function waitForThen(test, cb) {
    setTimeout(function() {
        test() ? cb.apply(this) : waitForThen(test, cb);
    }, 5);
}

function parseData(body){
    var messages = [];
    body.split('\n').forEach(function(text){
        if(text.length){
            text = JSON.parse(text);
            messages.push(text);
        }
    });
    return messages;
}


describe('Node Server', function() {

    it('Should answer requests for / with a 200 status code', function(done) {
        request('http://127.0.0.1:3000/', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('Should answer requests for content according to contentType', function(done) {
        request('http://127.0.0.1:3000/', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });




    it('Should answer GET requests for /api/chirps with a 200 status code', function(done) {
        request('http://127.0.0.1:3000/api/chirps', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should respond to API get request with a JSON string', function(done) {
        request('http://127.0.0.1:3000/api/chirps', function(error, response, body) {
            expect(body).to.be.a('string');
            done();
        });
    });

    it('should accept POST requests to /api/chirps', function(done) {
        var requestParams = {
            method: 'POST',
            uri: 'http://127.0.0.1:3000/api/chirps',
            json: {
                message: '8-bit High Life cred!',
                user: 'bot',
                timestamp: new Date().toISOString()
            }
        };

        request(requestParams, function(error, response, body) {
            expect(response.statusCode).to.equal(201);
            done();
        });
    });

    it('should respond with chirps that were previously posted', function(done) {
        var requestParams = {
            method: 'POST',
            uri: 'http://127.0.0.1:3000/api/chirps',
            json: {
                message: '8-bit High Life cred!',
                user: 'bot',
                timestamp: new Date().toISOString()
            }
        };

        request(requestParams, function(error, response, body) {
            request('http://127.0.0.1:3000/api/chirps', function(error, response, body) {
                var chirps = JSON.parse(body);
                var len = chirps.length - 1;
                expect(chirps[len].user).to.equal('bot');
                expect(chirps[len].message).to.equal('8-bit High Life cred!');
                done();
            });
        });
    });

    it('Should 404 when asked for a nonexistent file', function(done) {
        request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});