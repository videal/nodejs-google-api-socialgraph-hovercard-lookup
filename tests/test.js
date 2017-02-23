/**
 * Created by achuyan on 07.02.17.
 */
var request = require('request');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var EmailChecker = require('../main');

var callback = function (error, googlePlusUri) {
    return googlePlusUri;
};

describe('EmailChecker:', function() {
    describe('process method: checks whether an account identified by the given e-mail is available in Google+.', function() {
        it('should exist', function() {
            expect(EmailChecker.process).to.exist;
        });
        it('should have type "function"', function() {
            expect(EmailChecker.process).to.be.a('function');
        });
        it('should return null if method got no arguments', function() {
            expect(EmailChecker.process()).to.be.null;
        });
        it('should return null if type of email arguments is wrong', function() {
            expect(EmailChecker.process(request, [], null, callback)).to.be.undefined;
        });
        it('should return null if callback is not a function', function() {
            expect(EmailChecker.process(request, 'email', 'proxy', 'callback')).to.be.null;
        });
    });
});
