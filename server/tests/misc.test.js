const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
// import { expect } from 'chai';
const app = require('../../index');

chai.config.includeStack = true;

const expect = chai.expect;

describe('## Misc', () => {
	describe('# GET /health-check', () => {
		it('should return OK', (done) => {
			request(app)
				.get('/health-check')
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.text).to.equal('OK');
					done();
				});
		});
	});

	describe('# GET /404', () => {
		it('should return 404 status', (done) => {
			request(app)
				.get('/404')
				.expect(httpStatus.NOT_FOUND)
				.then((res) => {
					expect(res.body.message).to.equal('Not Found');
					done();
				});
		});
	});

	// describe('# Error Handling', () => {
	// 	it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
	// 		request(app)
	// 			.get('/v0.1.0/users/56z787zzz67fc')
	// 			.expect(httpStatus.INTERNAL_SERVER_ERROR)
	// 			.then(res => {
	// 				expect(res.body.message).to.equal('Internal Server Error');
	// 				done();
	// 			});
	// 	});
	//
	// 	it('should handle express validation error - username is required', (done) => {
	// 		request(app)
	// 			.post('/v0.1.0/users')
	// 			.send({
	// 				mobileNumber: '1234567890'
	// 			})
	// 			.expect(httpStatus.BAD_REQUEST)
	// 			.then(res => {
	// 				expect(res.body.message).to.equal('username" is required');
	// 				done();
	// 			});
	// 	});
	// });
});
