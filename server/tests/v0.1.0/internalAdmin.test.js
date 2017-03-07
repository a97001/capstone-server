const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const app = require('../../../index');
const ioClient = require('socket.io-client');
const co = require('co');
const jwt = require('jsonwebtoken');

chai.config.includeStack = true;

const expect = chai.expect;
const should = chai.should();
const socketURL = 'http://localhost:3000/v0.1.0';
const socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};

const Bill = require('../../models/bill');
const Block = require('../../models/block');
const Building = require('../../models/building');
const Document = require('../../models/document');
const Equipment = require('../../models/equipment');
const Model = require('../../models/model');
const FeatureType = require('../../models/featureType');
const Floor = require('../../models/floor');
const Group = require('../../models/group');
const Location = require('../../models/location');
const Negaport = require('../../models/negaport');
const Parameter = require('../../models/parameter');
const Photo = require('../../models/photo');
const Reading = require('../../models/reading');
const RecordBill = require('../../models/recordBill');
const Role = require('../../models/role');
const Session = require('../../models/session');
const Site = require('../../models/site');
const Structure = require('../../models/structure');
const Submission = require('../../models/submission');
const System = require('../../models/system');
const Tile = require('../../models/tile');
const User = require('../../models/user');
const WeatherHistory = require('../../models/weatherHistory');

describe('## v0.1.0 APIs', () => {
  before(() => {
    Session.remove({}, () => {});
    User.remove({}, () => {});
    Group.remove({}, () => {});
    Role.remove({}, () => {});
    Site.remove({}, () => {});
    Building.remove({}, () => {});
    Bill.remove({}, () => {});
    RecordBill.remove({}, () => {});
    Block.remove({}, () => {});
    FeatureType.remove({}, () => {});
    Floor.remove({}, () => {});
    Location.remove({}, () => {});
    Negaport.remove({}, () => {});
    Parameter.remove({}, () => {});
    Photo.remove({}, () => {});
    Tile.remove({}, () => {});
    Document.remove({}, () => {});
    Equipment.remove({}, () => {});
    Reading.remove({}, () => {});
    Model.remove({}, () => {});
    Structure.remove({}, () => {});
    Submission.remove({}, () => {});
    System.remove({}, () => {});
    WeatherHistory.remove({}, () => {});
  });
  const internalAdmin = {
    username: 'internalAdmin',
    email: 'cokenip@gmail.com',
    password: '77889900'
  };
	const me = {
		username: 'fishGay',
		email: 'a97001@gmail.com',
    password: '77889900'
	};
	const me1 = {
		username: 'fishGay1',
		email: 'fishgay1@gmail.com',
		password: '77889900'
	};
	const me2 = {
		username: 'fishGay2',
		email: 'fishgay2@gmail.com',
		password: '77889900'
	};
  let decodedRoot = null;
	let decodedMe = null;
	let decodedMe1 = null;
	let decodedMe2 = null;
  let credentialRoot = null;
	let credential = null;
	let credential1 = null;
	let credential2 = null;
	let group = null;
  let group1 = null;
  let role = null;
  let site = null;
  let site1 = null;
  let building = null;
  let location = null;
  let locationRootFolder = null;
  let locationRootDocument = null;
  let locationFolderDocument = null;
  let locationRootAlbum = null;
  let locationRootPhoto = null;
  let block = null;
  let floor = null;
  let floor2 = null;
  let floorRootFolder = null;
  let floorRootDocument = null;
  let floorRootAlbum = null;
  let floorRootPhoto = null;
  let featureType = null;
  let testFeature = null;
  let featureRootFolder = null;
  let featureRootDocument = null;
  let featureFolderDocument = null;
  let featureRootAlbum = null;
  let featureRootPhoto = null;
  let systemRootDocument = null;
  let systemRootFolder = null;
  let systemRootAlbum = null;
  let systemRootPhoto = null;
  let systemFolderDocument = null;
  let negaport = null;
  let port = null;
  let parameter = null;
  let paramSet = null;
  let model = null;
  let modelRootDocument = null;
  let modelRootFolder = null;
  let modelRootAlbum = null;
  let modelRootPhoto = null;
  let modelFolderDocument = null;
  let equipment = null;
  let equipmentRootDocument = null;
  let equipmentRootFolder = null;
  let equipmentFolderDocument = null;
  let equipmentRootAlbum = null;
  let equipmentRootPhoto = null;
  let sensor = null;
  let sensorModel = null;
  let sensorRootDocument = null;
  let sensorRootFolder = null;
  let sensorFolderDocument = null;
  let sensorRootAlbum = null;
  let sensorRootPhoto = null;
  let meter = null;
  let meterModel = null;
  let meterRootDocument = null;
  let meterRootFolder = null;
  let meterFolderDocument = null;
  let meterRootAlbum = null;
  let meterRootPhoto = null;
  let reading = null;
  let readingDate = null;
  let certificate = null;
  let certificateSection = null;
  let certificateSubsection = null;
  let edition = null;
  let submissionRootDocument = null;
  let submissionRootFolder = null;
  let submissionFolderDocument = null;
  let submissionRootAlbum = null;
  let submissionRootPhoto = null;
  let system = null;
  let systemSubsystem = null;
  let systemType = null;
  let trashes = null;
  let bill = null;
  let structure = null;
  const documentVersion = {};

	describe('## Users', () => {
		describe('# POST /v0.1.0/users', () => {
			it('should create a new user', (done) => {
				request(app)
				.post('/v0.1.0/users')
				.send({ email: me1.email, username: me1.username, password: me1.password })
				.expect(httpStatus.OK)
				.then((res) => {
					me1.resetPasswordToken = res.body.resetPasswordToken;
          me1._id = res.body._id;
				});
				request(app)
				.post('/v0.1.0/users')
				.send({ email: me2.email, username: me2.username, password: me2.password })
				.expect(httpStatus.OK)
				.then((res) => {
					me2.resetPasswordToken = res.body.resetPasswordToken;
          me2._id = res.body._id;
				});
				request(app)
				.post('/v0.1.0/users')
				.send({ email: me.email, username: me.username, password: me.password })
				.expect(httpStatus.OK)
				.then((res) => {
					me.resetPasswordToken = res.body.resetPasswordToken;
          me._id = res.body._id;
				});

        request(app)
        .post('/v0.1.0/users')
        .send({ email: internalAdmin.email, username: internalAdmin.username, password: internalAdmin.password })
        .expect(httpStatus.OK)
        .then((res) => {
          internalAdmin.resetPasswordToken = res.body.resetPasswordToken;
          internalAdmin._id = res.body._id;
          done();
        });
			});
		});

    describe('# POST /v0.1.0/users/confirmation/:token', () => {
      it('should confirm user account', (done) => {
        request(app)
        .post(`/v0.1.0/users/confirmation/${me1.resetPasswordToken}`)
        .send({ _id: me1._id })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential1 = res.body;
        });
        request(app)
        .post(`/v0.1.0/users/confirmation/${me2.resetPasswordToken}`)
        .send({ _id: me2._id })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential2 = res.body;
        });
        request(app)
        .post(`/v0.1.0/users/confirmation/${me.resetPasswordToken}`)
        .send({ _id: me._id })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential = res.body;
        });

        request(app)
        .post(`/v0.1.0/users/confirmation/${internalAdmin.resetPasswordToken}`)
        .send({ _id: internalAdmin._id })
        .expect(httpStatus.OK)
        .then((res) => {
          // credentialRoot = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/users/forget-password', () => {
      it('should forget user password', (done) => {
        request(app)
        .post('/v0.1.0/users/forget-password')
        .send({ email: me1.email })
        .expect(httpStatus.OK)
        .then((res) => {
          me1.resetPasswordToken = res.body.resetPasswordToken;
        });
        request(app)
        .post('/v0.1.0/users/forget-password')
        .send({ email: me2.email })
        .expect(httpStatus.OK)
        .then((res) => {
          me2.resetPasswordToken = res.body.resetPasswordToken;
        });
        request(app)
        .post('/v0.1.0/users/forget-password')
        .send({ email: me.email })
        .expect(httpStatus.OK)
        .then((res) => {
          me.resetPasswordToken = res.body.resetPasswordToken;
        });

        request(app)
        .post('/v0.1.0/users/forget-password')
        .send({ email: internalAdmin.email })
        .expect(httpStatus.OK)
        .then((res) => {
          internalAdmin.resetPasswordToken = res.body.resetPasswordToken;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/users/reset-password/:token', () => {
      it('should reset user password', (done) => {
        request(app)
        .post(`/v0.1.0/users/reset-password/${me1.resetPasswordToken}`)
        .send({ _id: me1._id, password: me1.password })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential1 = res.body;
        });
        request(app)
        .post(`/v0.1.0/users/reset-password/${me2.resetPasswordToken}`)
        .send({ _id: me2._id, password: me2.password })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential2 = res.body;
        });
        request(app)
        .post(`/v0.1.0/users/reset-password/${me.resetPasswordToken}`)
        .send({ _id: me._id, password: me.password })
        .expect(httpStatus.OK)
        .then((res) => {
          // credential = res.body;
        });

        request(app)
        .post(`/v0.1.0/users/reset-password/${internalAdmin.resetPasswordToken}`)
        .send({ _id: internalAdmin._id, password: internalAdmin.password })
        .expect(httpStatus.OK)
        .then((res) => {
          // credentialRoot = res.body;
          done();
        });
      });
    });

		describe('# POST /v0.1.0/users/login', () => {
			it('should login user', (done) => {
				request(app)
				.post('/v0.1.0/users/login')
				.send({ email: me1.email, password: me1.password })
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.accessToken);
          credential1 = res.body;
					let decoded = jwt.decode(res.body.accessToken);
					decoded = decodeURI(decoded);
					decodedMe1 = JSON.parse(decoded);
				});
				request(app)
				.post('/v0.1.0/users/login')
				.send({ email: me2.email, password: me2.password })
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.accessToken);
          credential2 = res.body;
					let decoded = jwt.decode(res.body.accessToken);
					decoded = decodeURI(decoded);
					decodedMe2 = JSON.parse(decoded);
				});

				request(app)
				.post('/v0.1.0/users/login')
				.send({ email: me.email, password: me.password })
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.accessToken);
          credential = res.body;
					let decoded = jwt.decode(res.body.accessToken);
					decoded = decodeURI(decoded);
					decodedMe = JSON.parse(decoded);
          done();
				});

        request(app)
        .post('/v0.1.0/users/login')
        .send({ email: internalAdmin.email, password: internalAdmin.password })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.accessToken);
          credentialRoot = res.body;
          let decoded = jwt.decode(res.body.accessToken);
          decoded = decodeURI(decoded);
          decodedRoot = JSON.parse(decoded);
          User.update({ _id: decodedRoot._id }, { $push: { roles: 'internalAdmin' } }, (err) => {
          });
        });
			});
		});

		describe('# GET /v0.1.0/users/me', () => {
			it('should get me', (done) => {
				request(app)
				.get('/v0.1.0/users/me')
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body._id);
					done();
				});
			});
		});

    describe('# GET /v0.1.0/users/checker/email', () => {
      it('should check email exists', (done) => {
        request(app)
        .get('/v0.1.0/users/checker/email')
        .query({
          email: me.email
        })
        // .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
					expect(res.body.isExist).to.equal(true);
          done();
        });
      });
    });

		describe('# POST /v0.1.0/users/token', () => {
			it('should refresh access token (user)', (done) => {
				request(app)
				.post('/v0.1.0/users/token')
				// .set('Authorization', `Bearer ${credential.accessToken}`)
				.send({ clientId: credentialRoot.clientId, user: decodedRoot._id, refreshToken: credentialRoot.refreshToken })
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.accessToken);
          credentialRoot.accessToken = res.body.accessToken;
          let decoded = jwt.decode(res.body.accessToken);
          decoded = decodeURI(decoded);
          decodedRoot = JSON.parse(decoded);
					done();
				});
			});
		});

    describe('# POST /v0.1.0/users/logged-in', () => {
      it('should check is logged-in', (done) => {
        request(app)
        .post('/v0.1.0/users/logged-in')
        // .set('Authorization', `Bearer ${credential.accessToken}`)
        .send({ clientId: credentialRoot.clientId, refreshToken: credentialRoot.refreshToken, user: decodedRoot._id })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isLoggedIn);
          done();
        });
      });
    });

		describe('# PUT /v0.1.0/users/me/icons', () => {
			it('should update user icon', (done) => {
				request(app)
				.put('/v0.1.0/users/me/icons')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({ uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
				.expect(httpStatus.CREATED)
				.then((res) => {
					should.exist(res.body.icon);
					decodedMe.icon = res.body.icon;
					done();
				});
			});
		});

    describe('# GET /v0.1.0/users/:userId', () => {
			it('should show user detail', (done) => {
				request(app)
				.get(`/v0.1.0/users/${decodedRoot._id}`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.username);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/users/:userId/icons/:iconId', () => {
			it('should get user icon', (done) => {
				request(app)
				.get(`/v0.1.0/users/${decodedRoot._id}/icons/${decodedRoot.icon}`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					done();
				});
			});
		});

		describe('# GET /v0.1.0/users/logout', () => {
			it('should logout user', (done) => {
				request(app)
				.post('/v0.1.0/users/logout')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({ clientId: credentialRoot.clientId })
				.expect(httpStatus.NO_CONTENT)
				.then((res) => {
					done();
				});
			});
		});

		describe('# GET /v0.1.0/users', () => {
			it('should search users', (done) => {
				request(app)
				.get('/v0.1.0/users')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.query({
					query: 'gay1'
				})
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});
	});

	describe('## Groups', () => {
		describe('# POST /v0.1.0/groups', () => {
			it('should create group', (done) => {
				request(app)
				.post('/v0.1.0/groups')
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({
					name: 'fishGay is gay',
          password: '77889900',
          code: 'test'
				})
				.expect(httpStatus.CREATED)
				.then((res) => {
					should.exist(res.body._id);
					group = res.body;
          request(app)
          .post('/v0.1.0/groups')
          .set('Authorization', `Bearer ${credential.accessToken}`)
          .send({
            name: 'test11',
            password: '77889900',
            code: 'test11'
          })
          .expect(httpStatus.CREATED)
          .then((res1) => {
            should.exist(res1.body._id);
            group1 = res1.body;
            done();
          });
				});
			});
		});

		describe('# GET /v0.1.0/groups/:groupId', () => {
			it('should get groups detail', (done) => {
				request(app)
				.get(`/v0.1.0/groups/${group._id}`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body._id);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/users/me/groups', () => {
			it('should get groups of user', (done) => {
				request(app)
				.get('/v0.1.0/users/me/groups')
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/groups', () => {
			it('should search groups', (done) => {
				request(app)
				.get('/v0.1.0/groups')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.query({
					query: 'gay'
				})
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});

		describe('# PUT /v0.1.0/groups/:groupId', () => {
			it('should update group', (done) => {
				request(app)
				.put(`/v0.1.0/groups/${group._id}`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({
					name: 'fishGay is very gay',
          code: 'test'
				})
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body._id);
					expect(res.body.name).to.equal('fishGay is very gay');
          group.name = res.body.name;
					done();
				});
			});
		});

		describe('# PUT /v0.1.0/group/:groupId/icons', () => {
			it('should update group icon', (done) => {
				request(app)
				.put(`/v0.1.0/groups/${group._id}/icons`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({ uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
				.expect(httpStatus.CREATED)
				.then((res) => {
					should.exist(res.body.icon);
					group.icon = res.body.icon;
					done();
				});
			});
		});

		describe('# GET /v0.1.0/groups/:groupId/icons/:iconId', () => {
			it('should get group icon', (done) => {
				request(app)
				.get(`/v0.1.0/groups/${group._id}/icons/${group.icon}`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					done();
				});
			});
		});

    describe('# PUT /v0.1.0/group/:groupId/status', () => {
      it('should update group status', (done) => {
        request(app)
        .put(`/v0.1.0/groups/${group._id}/status`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ status: 'approved' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.status).to.equal('approved');
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/group/:groupId/code', () => {
      it('should update group code', (done) => {
        request(app)
        .put(`/v0.1.0/groups/${group._id}/code`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ code: 'test1' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.code).to.equal('test1');
          done();
        });
      });
    });

    describe('# GET /v0.1.0/group/checker', () => {
      it('should check group', (done) => {
        request(app)
        .get('/v0.1.0/groups/checker')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ code: 'test1' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          expect(res.body.isExist).to.equal(true);
          done();
        });
      });
    });

		describe('# POST /v0.1.0/groups/:groupId/invitations', () => {
			it('should invite group member', (done) => {
				request(app)
				.post(`/v0.1.0/groups/${group._id}/invitations`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({
					user: decodedMe2._id
				})
				.expect(httpStatus.OK)
				.then((res) => {
				});
				request(app)
				.post(`/v0.1.0/groups/${group._id}/invitations`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({
					user: decodedMe1._id
				})
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.invitedUser);
					expect(res.body.invitedUser).to.equal(decodedMe1._id);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/groups/:groupId/invitations', () => {
			it('should get invited users', (done) => {
				request(app)
				.get(`/v0.1.0/groups/${group._id}/invitations`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});

		describe('# DELETE /v0.1.0/groups/:groupId/invitations/:userId', () => {
			it('should disinvite group member', (done) => {
				request(app)
				.delete(`/v0.1.0/groups/${group._id}/invitations/${decodedMe2._id}`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.disinvitedUser);
					expect(res.body.disinvitedUser).to.equal(decodedMe2._id);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/users/me/group-invitations', () => {
			it('should get my group invitations', (done) => {
				request(app)
				.get('/v0.1.0/users/me/group-invitations')
				.set('Authorization', `Bearer ${credential1.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});

		describe('# DELETE /v0.1.0/users/me/group-invitations/:groupId', () => {
			it('should reject group invitation', (done) => {
				request(app)
				.delete(`/v0.1.0/users/me/group-invitations/${group._id}`)
				.set('Authorization', `Bearer ${credential1.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body.rejectedGroup);
					expect(res.body.rejectedGroup).to.equal(group._id);
					done();
				});
			});
		});

		describe('# POST /v0.1.0/users/me/group-invitations/:groupId', () => {
			it('should accept group invitation', (done) => {
				request(app)
				.post(`/v0.1.0/groups/${group._id}/invitations`)
				.set('Authorization', `Bearer ${credential.accessToken}`)
				.send({
					user: decodedMe1._id
				})
				.then(res =>
					request(app)
					.post(`/v0.1.0/users/me/group-invitations/${group._id}`)
          .send({ password: '77889900' })
					.set('Authorization', `Bearer ${credential1.accessToken}`)
					.expect(httpStatus.OK)
				)
				.then((res) => {
					should.exist(res.body.acceptedGroup);
					expect(res.body.acceptedGroup).to.equal(group._id);
					done();
				});
			});
		});

    describe('# GET /v0.1.0/groups/:groupId/groupmates', () => {
      it('should get groupmates', (done) => {
        request(app)
        .get(`/v0.1.0/groups/${group._id}/groupmates`)
        .set('Authorization', `Bearer ${credential1.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.members).to.have.length.above(0);
          expect(res.body.admins).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/groups/:groupId/admins', () => {
      it('should create group admin', (done) => {
        request(app)
        .post(`/v0.1.0/groups/${group._id}/admins`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .send({
          user: decodedMe1._id
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.user);
          expect(res.body.user).to.equal(decodedMe1._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/groups/:groupId/admins/:userId', () => {
      it('should delete group admin', (done) => {
        request(app)
        .delete(`/v0.1.0/groups/${group._id}/admins/${decodedMe1._id}`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.user);
          expect(res.body.user).to.equal(decodedMe1._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/users/login', () => {
      it('should login group', (done) => {
        request(app)
        .post('/v0.1.0/users/login')
        .send({ email: me1.email, password: me1.password, group: group.name })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.accessToken);
          credential1 = res.body;
          let decoded = jwt.decode(res.body.accessToken);
          decoded = decodeURI(decoded);
          decodedMe1 = JSON.parse(decoded);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/users/token', () => {
      it('should refresh access token (group)', (done) => {
        request(app)
        .post('/v0.1.0/users/token')
        // .set('Authorization', `Bearer ${credential.accessToken}`)
        .send({ clientId: credential1.clientId, refreshToken: credential1.refreshToken, user: decodedMe1._id, group: group._id })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.accessToken);
          // credentialRoot.accessToken = res.body.accessToken;
          // let decoded = jwt.decode(res.body.accessToken);
          // decoded = decodeURI(decoded);
          // decodedRoot = JSON.parse(decoded);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/groups/:groupId/members/:userId', () => {
      it('should delete group member', (done) => {
        request(app)
        .delete(`/v0.1.0/groups/${group._id}/members/${decodedMe1._id}`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.user);
          expect(res.body.user).to.equal(decodedMe1._id);
          done();
        });
      });
    });
	});

  describe('## Roles', () => {
    describe('# POST /v0.1.0/groups/:groupId/roles', () => {
      it('should create role', (done) => {
        request(app)
        .post(`/v0.1.0/groups/${group._id}/roles`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'fishGay is gay',
          whitelist: [{ isOverride: true, methods: ['*'], url: '/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors', metadata: {} }]
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          role = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/groups/:groupId/roles/:roleId', () => {
      it('should get role detail', (done) => {
        request(app)
        .get(`/v0.1.0/groups/${group._id}/roles/${role._id}`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/groups/:groupId/roles/:roleId', () => {
      it('should update role', (done) => {
        request(app)
        .put(`/v0.1.0/groups/${group._id}/roles/${role._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'gay',
          whitelist: [{ isOverride: true, methods: ['*'], url: '/asset/sites/:site/buildings/:buildingId/blocks', metadata: {} }]
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          role = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/groups/:groupId/roles', () => {
      it('should get all roles', (done) => {
        request(app)
        .get(`/v0.1.0/groups/${group._id}/roles`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/groups/:groupId/roles/checker', () => {
      it('should check role name', (done) => {
        request(app)
        .get(`/v0.1.0/groups/${group._id}/roles/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ name: 'gay' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/groups/:groupId/roles/:roleId/users', () => {
      it('should create role users', (done) => {
        request(app)
        .post(`/v0.1.0/groups/${group._id}/roles/${role._id}/users`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ users: [decodedMe._id] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.addedUsers);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/groups/:groupId/roles/:roleId/users', () => {
      it('should get all role users', (done) => {
        request(app)
        .get(`/v0.1.0/groups/${group._id}/roles/${role._id}/users`)
        .set('Authorization', `Bearer ${credential.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/groups/:groupId/roles/:roleId/users', () => {
      it('should delete role users', (done) => {
        request(app)
        .delete(`/v0.1.0/groups/${group._id}/roles/${role._id}/users`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ users: [decodedMe._id] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.deletedUsers);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/groups/:groupId/roles/:roleId', () => {
      it('should delete role users', (done) => {
        request(app)
        .delete(`/v0.1.0/groups/${group._id}/roles/${role._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Sites', () => {
		describe('# POST /v0.1.0/asset/sites', () => {
			it('should create site', (done) => {
				request(app)
				.post('/v0.1.0/asset/sites')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({
          country: 'Hong Kong',
          district: 'Kowloon',
          name: 'gay hong',
          group: group._id
				})
				.expect(httpStatus.CREATED)
				.then((res) => {
					should.exist(res.body._id);
					site = res.body;
          request(app)
          .post('/v0.1.0/asset/sites')
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .send({
            country: 'Hong Kong',
            district: 'Kowloon',
            name: 'gay hong1',
            group: group._id
          })
          .expect(httpStatus.CREATED)
          .then((res1) => {
            should.exist(res1.body._id);
            site1 = res1.body;
            done();
          });
				});
			});
		});

		describe('# GET /v0.1.0/asset/sites/:siteId', () => {
			it('should get site detail', (done) => {
				request(app)
				.get(`/v0.1.0/asset/sites/${site._id}`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body._id);
					done();
				});
			});
		});

		describe('# GET /v0.1.0/asset/sites', () => {
			it('should get sites', (done) => {
				request(app)
				.get('/v0.1.0/asset/sites')
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
					expect(res.body).to.have.length.above(0);
					done();
				});
			});
		});

    describe('# PUT /v0.1.0/asset/sites/:siteId/group', () => {
      it('should update site group', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/group`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ group: group1._id })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          request(app)
          .put(`/v0.1.0/asset/sites/${site._id}/group`)
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .send({ group: group._id })
          .expect(httpStatus.OK)
          .then((res1) => {
            should.exist(res1.body._id);
            done();
          });
        });
      });
    });

		describe('# PUT /v0.1.0/asset/site/:siteId', () => {
			it('should update site', (done) => {
				request(app)
				.put(`/v0.1.0/asset/sites/${site._id}`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({
					name: 'fishGay is very gay',
          country: site.country,
          district: site.district
				})
				.expect(httpStatus.OK)
				.then((res) => {
					should.exist(res.body._id);
					expect(res.body.name).to.equal('fishGay is very gay');
					done();
				});
			});
		});

		describe('# PUT /v0.1.0/asset/sites/:siteId/image', () => {
			it('should update site image', (done) => {
				request(app)
				.put(`/v0.1.0/asset/sites/${site._id}/image`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({ uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
				.expect(httpStatus.OK)
				.then((res) => {
          expect(res).to.be.image; // eslint-disable-line no-unused-expressions
					done();
				});
			});
		});

		describe('# GET /v0.1.0/asset/sites/:siteId/image', () => {
			it('should get site image', (done) => {
				request(app)
				.get(`/v0.1.0/asset/sites/${site._id}/image`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.expect(httpStatus.OK)
				.then((res) => {
          expect(res).to.be.image; // eslint-disable-line no-unused-expressions
					done();
				});
			});
		});

    describe('# POST /v0.1.0/asset/sites/:siteId/buildings', () => {
			it('should create site building', (done) => {
				request(app)
				.post(`/v0.1.0/asset/sites/${site._id}/buildings`)
				.set('Authorization', `Bearer ${credentialRoot.accessToken}`)
				.send({
          name: 'gay hong',
          airport: 'VHHH'
				})
				.expect(httpStatus.CREATED)
				.then((res) => {
					should.exist(res.body._id);
					building = res.body;
					done();
				});
			});
		});

    describe('# GET /v0.1.0/asset/sites/:siteId/buildings', () => {
      it('should get site buildings', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
	});

  describe('## Buildings', () => {
    describe('# GET /v0.1.0/asset/sites/:site/buildings', () => {
      it('should get buildings', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId', () => {
      it('should get building detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId', () => {
      it('should update building', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'fishGay is very gay',
          airport: 'VHHH'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.name).to.equal('fishGay is very gay');
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/packages', () => {
      it('should update building packages', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/packages`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          bsm: { isActivated: true, expiry: new Date().setFullYear(new Date().getFullYear() + 10) },
          erm: { isActivated: true, expiry: new Date().setFullYear(new Date().getFullYear() + 10) },
          cam: { isActivated: true, expiry: new Date().setFullYear(new Date().getFullYear() + 10) },
          all: { storageLimit: 100000000 }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:siteId/buildings/:buildingId/site', () => {
      it('should update building site', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/site`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ site: site1._id })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          request(app)
          .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/site`)
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .send({ site: site._id })
          .expect(httpStatus.OK)
          .then((res1) => {
            should.exist(res1.body._id);
            done();
          });
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/image', () => {
      it('should update building image', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/image`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res).to.be.image; // eslint-disable-line no-unused-expressions
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/image', () => {
      it('should get building image', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/image`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res).to.be.image; // eslint-disable-line no-unused-expressions
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks', () => {
      it('should create building block', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', description: 'gay', isSchematic: false })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          block = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks', () => {
      it('should get building blocks', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/buildings', () => {
      it('should show all buildings', (done) => {
        request(app)
        .get('/v0.1.0/asset/buildings')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/users/me/settings', () => {
      it('should update user settings', (done) => {
        request(app)
        .put('/v0.1.0/users/me/settings')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          preset: {
            site: site._id,
            building: building._id,
            language: 'eng'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.preset.language).to.equal('eng');
          done();
        });
      });
    });
  });

  describe('## Blocks', () => {
    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId', () => {
      it('should get block detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId', () => {
      it('should update block', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'fishGay is very gay',
          description: 'VHHH',
          isSchematic: false
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.name).to.equal('fishGay is very gay');
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors', () => {
      it('should create block floors', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ uploadedDocs: [{ name: 'building.zip', type: 'zip' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors', () => {
      it('should get block floors', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          floor = res.body[0];
          floor2 = res.body[1];
          block.floors = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/order', () => {
      it('should update block floors order', (done) => {
        const newOrder = [];
        for (let i = block.floors.length - 1; i >= 0; i--) {
          newOrder.push(block.floors[i]._id);
        }
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/order`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ order: newOrder })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body[0]._id).to.equal(newOrder[0]);
          done();
        });
      });
    });
  });

  describe('## Structures', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/structures', () => {
      it('should create structure', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/structures`)
        .send({ name: 'structure' })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          structure = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/structures/:structureId/versions', () => {
      it('should create structure version', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/structures/${structure._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ uploadedDocs: [{ name: '14077952-rac_advanced_sample_projectrvt.zip', type: 'zip' }], svfPath: 'Resource/3D_View/_3D_ 168550/_3D_.svf' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body._id);
          structure = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/structures', () => {
      it('should show structures', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/structures`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/structures/:structureId/versions/:structureVersionId/files/*', () => {
      it('should show structure version resource', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/structures/${structure._id}/versions/${structure.versions[0]._id}/files/Resource/objects_attrs.json.gz`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });
  });

  describe('## Systems', () => {
    describe('# POST /v0.1.0/asset/systems', () => {
      it('should create system', (done) => {
        request(app)
        .post('/v0.1.0/asset/systems')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            system: 'HVAC'
          },
          zho_hk: {
            system: 'HVAC'
          },
          zho_cn: {
            system: 'HVAC'
          },
          category: 'active'
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          system = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/system/:systemId', () => {
      it('should update system', (done) => {
        request(app)
        .put(`/v0.1.0/asset/systems/${system._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            system: 'HVAC'
          },
          zho_hk: {
            system: 'HVAC香港呀屌'
          },
          zho_cn: {
            system: 'HVAC'
          },
          category: 'active'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems/:systemId', () => {
      it('should show system detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/systems/${system._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems', () => {
      it('should show all systems', (done) => {
        request(app)
        .get('/v0.1.0/asset/systems')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/systems/:systemId/subsystems', () => {
      it('should create subsystem', (done) => {
        request(app)
        .post(`/v0.1.0/asset/systems/${system._id}/subsystems`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            subsystem: 'Cooling Generating Systems'
          },
          zho_hk: {
            subsystem: 'Cooling Generating Systems'
          },
          zho_cn: {
            subsystem: 'Cooling Generating Systems'
          }
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemSubsystem = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId', () => {
      it('should update subsystem', (done) => {
        request(app)
        .put(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            subsystem: 'Cooling Generating Systems'
          },
          zho_hk: {
            subsystem: 'Cooling Generating Systems香港呀屌'
          },
          zho_cn: {
            subsystem: 'Cooling Generating Systems'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId', () => {
      it('should show subsystem detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems/:systemId/subsystems', () => {
      it('should show all subsystems', (done) => {
        request(app)
        .get(`/v0.1.0/asset/systems/${system._id}/subsystems`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId/types', () => {
      it('should create type', (done) => {
        request(app)
        .post(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}/types`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            type: 'Chillers'
          },
          zho_hk: {
            type: 'Chillers'
          },
          zho_cn: {
            type: 'Chillers'
          }
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemType = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId/types/:typeId', () => {
      it('should update type', (done) => {
        request(app)
        .put(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            type: 'Chillers'
          },
          zho_hk: {
            type: 'Chillers香港呀屌'
          },
          zho_cn: {
            type: 'Chillers'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId/types/:typeId', () => {
      it('should show type detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/systems/:systemId/subsystems/:subsystemId/types', () => {
      it('should show all types', (done) => {
        request(app)
        .get(`/v0.1.0/asset/systems/${system._id}/subsystems/${systemSubsystem._id}/types`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  describe('## Feature Types', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/feature-types', () => {
      it('should create feature type', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/:site/buildings/${building._id}/feature-types`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'test',
          templates: [{
            field: 'test',
            dataType: 'text',
            choices: ['test']
          }]
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.name);
          featureType = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/feature-types/:featureName', () => {
      it('should update feature type', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/:site/buildings/${building._id}/feature-types/${featureType.name}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'test',
          templates: [...featureType.templates, {
            field: 'test1',
            dataType: 'text',
            choices: ['test']
          }]
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.name);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/feature-types/:featureName', () => {
      it('should show feature type detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/:site/buildings/${building._id}/feature-types/${featureType.name}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.name);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/feature-types', () => {
      it('should show all feature types', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/:site/buildings/${building._id}/feature-types`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:buildingId/feature-types/:featureName', () => {
      it('should delete feature type', (done) => {
        request(app)
        .delete(`/v0.1.0/asset/sites/:site/buildings/${building._id}/feature-types/${featureType.name}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.name);
          done();
        });
      });
    });
  });

  describe('## Floors', () => {
    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId', () => {
      it('should get floor detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId', () => {
      it('should update floor', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          name: 'gay'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.name).to.equal('gay');
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/tiles', () => {
      it('should update floor tiles', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/tiles`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ uploadedDocs: [{ name: 'floor.zip', type: 'zip' }] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          floor = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/tiles/:tileId/z/:z/x/:x/y/:y', () => {
      it('should get a floor tile', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/tiles/${floor.base}/z/2/x/0/y/0`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders', () => {
      it('should create floor root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', cTags: ['gay'], desc: '' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          floorRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders', () => {
      it('should create floor root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', system: system._id, cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          floorRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders', () => {
      it('should show floor root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:floorDocumentId/download/:filename', () => {
      it('should download floor root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/documents', () => {
      it('should create floor folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', system: system._id, cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId', () => {
      it('should show floor folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/documents', () => {
      it('should show floor folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:floorDocumentId/versions', () => {
      it('should create floor root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:floorDocumentId/versions/:documentVersionId/download/:filename', () => {
      it('should download floor root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}/versions/${documentVersion._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:floorDocumentId/versions/:documentVersionId', () => {
      it('should delete floor root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/documents/:floorDocumentId/download/:filename', () => {
      it('should download floor folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootFolder._id}/documents/${floorRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId', () => {
      it('should move floor document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', system: system._id, location: { asset: floor._id, destination: floorRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId', () => {
      it('should move floor document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', system: system._id, location: { asset: floor._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId', () => {
      it('should delete floor document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId', () => {
      it('should delete floor folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/folders/${floorRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums', () => {
      it('should create floor root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          floorRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums', () => {
      it('should create floor root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          floorRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums', () => {
      it('should show floor root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show floor root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId/photos', () => {
      it('should create floor album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId', () => {
      it('should show floor album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/:albumId/photos', () => {
      it('should show floor album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId/download/:filename', () => {
      it('should download floor photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId', () => {
      it('should move floor photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: floorRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: floor._id, destination: floorRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId', () => {
      it('should move floor photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: floorRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: floor._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId', () => {
      it('should delete floor photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/albums/:albumId', () => {
      it('should delete floor album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/albums/${floorRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features', () => {
      it('should create floor feature', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'Point', coordinates: [0, 0] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.properties._id);
          testFeature = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features', () => {
      it('should show feature type features', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          // console.log(res.body);
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types', () => {
      it('should show feature types', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  describe('## Features', () => {
    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features/:featureId', () => {
      it('should show feature detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature.properties._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          testFeature = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features/:featureId', () => {
      it('should update feature detail', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'test', name: 'gay gay', metadata: [] })
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders', () => {
      it('should create feature root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', cTags: ['gay'], desc: '' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          featureRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders', () => {
      it('should create feature root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', system: system._id, cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          featureRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders', () => {
      it('should show feature root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:documentId/versions', () => {
      it('should create feature root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // should.exist(res.body.oldVersion);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:featureDocumentId/versions/:documentVersionId/download/:filename', () => {
      it('should download feature root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}/versions/${documentVersion._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:featureDocumentId/versions/:documentVersionId', () => {
      it('should delete feature root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:featureDocumentId/download/:filename', () => {
      it('should download feature root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId/documents', () => {
      it('should create feature folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', system: system._id, cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          featureFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:featureFolderId/documents/:featureDocumentId/download/:filename', () => {
      it('should download feature folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootFolder._id}/documents/${featureFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId', () => {
      it('should show feature folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId/documents', () => {
      it('should show feature folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId', () => {
      it('should move feature document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', system: system._id, location: { asset: testFeature._id, destination: featureRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId', () => {
      it('should move feature document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', system: system._id, location: { asset: testFeature._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId', () => {
      it('should delete feature document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootDocument._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:folderId', () => {
      it('should delete feature folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/folders/${featureRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums', () => {
      it('should create feature root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          featureRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums', () => {
      it('should create feature root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          featureRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums', () => {
      it('should show feature root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show feature root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId/photos', () => {
      it('should create feature album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId', () => {
      it('should show feature album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootAlbum._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId/photos', () => {
      it('should show feature album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId/download/:filename', () => {
      it('should download feature photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId', () => {
      it('should move feature photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: featureRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: testFeature._id, destination: featureRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId', () => {
      it('should move feature photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: featureRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: testFeature._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId', () => {
      it('should delete feature photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootPhoto._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumId', () => {
      it('should delete feature album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}/albums/${featureRootAlbum._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features/:featureId', () => {
      it('should delete feature', (done) => {
        request(app)
        .delete(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${testFeature._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });
  });

  describe('## Parameters', () => {
    describe('# POST /v0.1.0/asset/parameters', () => {
      it('should create default parameter', (done) => {
        request(app)
        .post('/v0.1.0/asset/parameters')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', category: 'Energy', unit: 'g', formula: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          parameter = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/parameters/:parameterId', () => {
      it('should update default system', (done) => {
        request(app)
        .put(`/v0.1.0/asset/parameters/${parameter._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', category: 'Energy', unit: 'g', formula: [] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/parameters/:parameterId', () => {
      it('should show default parameter detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/parameters/${parameter._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          parameter = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/parameters', () => {
      it('should show all default parameters', (done) => {
        request(app)
        .get('/v0.1.0/asset/parameters')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /asset/parameters/checker', () => {
      it('should check parameter name', (done) => {
        request(app)
        .get('/v0.1.0/asset/parameters/checker')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ name: parameter.name })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });
  });

  describe('## ParamSets', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/paramsets', () => {
      it('should create paramSet', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', parameter: parameter._id, contour: { min: 0, max: 500, radius: 15 } })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          paramSet = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/paramsets/:paramSetId', () => {
      it('should update paramSet', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets/${paramSet._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', parameter: parameter._id, contour: { min: 0, max: 500, radius: 15 } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/paramsets/:paramSetId', () => {
      it('should show paramSet detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets/${paramSet._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          paramSet = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/paramsets', () => {
      it('should show all paramSets', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /asset/sites/:site/buildings/:buildingId/paramsets/checker', () => {
      it('should check paramSet name', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ name: paramSet.name })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });
  });

  describe('## Equipment Models', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models', () => {
      it('should create model', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', attributes: { test: 'test' }, templates: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          model = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models', () => {
      it('should show models of a type', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId', () => {
      it('should update model', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', templates: [] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
					expect(res.body.name).to.equal('gaygay');
          model = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId', () => {
      it('should show model detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders', () => {
      it('should create model root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          modelRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders', () => {
      it('should create model root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          modelRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders', () => {
      it('should show model root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:modelDocumentId/download/:filename', () => {
      it('should download model root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/documents', () => {
      it('should create model folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          modelFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId', () => {
      it('should show model folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/documents', () => {
      it('should show model folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/documents/:modelDocumentId/download/:filename', () => {
      it('should download model folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootFolder._id}/documents/${modelFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/versions', () => {
      it('should create model root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download model root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete model root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/checker', () => {
      it('should check model name duplication', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ name: 'gay' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId', () => {
      it('should move model document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: model._id, destination: modelRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId', () => {
      it('should move model document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: model._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId', () => {
      it('should delete model document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/folders/:folderId', () => {
      it('should delete model folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/folders/${modelRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums', () => {
      it('should create model root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          modelRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums', () => {
      it('should create model root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          modelRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums', () => {
      it('should show model root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show model root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId/photos', () => {
      it('should create model album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId', () => {
      it('should show model album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId/photos', () => {
      it('should show model album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId/download/:filename', () => {
      it('should download model photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId', () => {
      it('should move model photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: modelRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: model._id, destination: modelRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId', () => {
      it('should move model photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: modelRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: model._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId', () => {
      it('should delete model photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/albums/:albumId', () => {
      it('should delete model album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/albums/${modelRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Equipments', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments', () => {
      it('should create equipment', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gay', metadata: [], cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          equipment = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments', () => {
      it('should show equipments of a model', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/equipments', () => {
      it('should show all equipments', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/equipments`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId', () => {
      it('should update equipment', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gaygay' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.modelNo).to.equal('gaygay');
          equipment = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId', () => {
      it('should show equipment detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders', () => {
      it('should create equipment root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          equipmentRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders', () => {
      it('should create equipment root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          equipmentRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders', () => {
      it('should show equipment root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:equipmentDocumentId/download/:filename', () => {
      it('should download equipment root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/documents', () => {
      it('should create equipment folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          equipmentFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId', () => {
      it('should show equipment folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/documents', () => {
      it('should show equipment folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/documents/:equipmentDocumentId/download/:filename', () => {
      it('should download equipment folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootFolder._id}/documents/${equipmentFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/versions', () => {
      it('should create equipment root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download equipment root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete equipment root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/checker', () => {
      it('should check equipment modelNo', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ modelNo: equipment.modelNo })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId', () => {
      it('should move equipment document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: equipment._id, destination: equipmentRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId', () => {
      it('should move equipment document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: equipment._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId', () => {
      it('should delete equipment document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/folders/:folderId', () => {
      it('should delete equipment folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/folders/${equipmentRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums', () => {
      it('should create equipment root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          equipmentRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums', () => {
      it('should create equipment root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          equipmentRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums', () => {
      it('should show equipment root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show equipment root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId/photos', () => {
      it('should create equipment album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId', () => {
      it('should show equipment album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId/photos', () => {
      it('should show equipment album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId/download/:filename', () => {
      it('should download equipment photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId', () => {
      it('should move equipment photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: equipment._id, destination: equipmentRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId', () => {
      it('should move equipment photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: equipment._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId', () => {
      it('should delete equipment photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/albums/:albumId', () => {
      it('should delete equipment album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/albums/${equipmentRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    // describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/readings', () => {
    //   it('should update equipment readings', (done) => {
    //     const newReading = { date: new Date() };
    //     newReading[paramSet._id.toString()] = 100;
    //     const newReading1 = { date: new Date() };
    //     newReading1[paramSet._id.toString()] = 200;
    //     request(app)
    //     .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/readings`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .send({ readings: [newReading, newReading1] })
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       should.exist(res.body.upserted);
    //       expect(res.body.upserted).to.have.length.above(0);
    //       reading = res.body.upserted[0];
    //       done();
    //     });
    //   });
    // });
    //
    // describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/readings', () => {
    //   it('should show equipment readings', (done) => {
    //     request(app)
    //     .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/readings`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       expect(res.body).to.have.length.above(0);
    //       done();
    //     });
    //   });
    // });
    //
    // describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:building/systems/:systemId/subsystems/:subsystemId/types/:typeId/models/:modelId/equipments/:equipmentId/readings/:readingId', () => {
    //   it('should delete equipment readings', (done) => {
    //     request(app)
    //     .delete(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/models/${model._id}/equipments/${equipment._id}/readings/${reading._id}`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       should.exist(res.body._id);
    //       done();
    //     });
    //   });
    // });
  });

  describe('## Sensors', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models', () => {
      it('should create sensor model', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', attributes: { test: 'test' }, templates: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          sensorModel = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models', () => {
      it('should show sensor models of a sensor type', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/sensor-types/:meterType/models/:modelId', () => {
      it('should update sensor model', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', templates: [] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
					expect(res.body.name).to.equal('gaygay');
          sensorModel = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/sensor-types/:meterType/models/:modelId', () => {
      it('should show sensor model detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors', () => {
      it('should create sensor', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gay', metadata: [], cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          sensor = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors', () => {
      it('should show sensors of a model', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensors', () => {
      it('should show all sensor', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensors`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/checker', () => {
      it('should check sensor modelNo', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ modelNo: sensor.modelNo })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId', () => {
      it('should update sensor', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gaygay' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.modelNo).to.equal('gaygay');
          sensor = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId', () => {
      it('should show sensor detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders', () => {
      it('should create sensor root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          sensorRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders', () => {
      it('should create sensor root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          sensorRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders', () => {
      it('should show sensor root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:sensorDocumentId/download/:filename', () => {
      it('should download sensor root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/documents', () => {
      it('should create sensor folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          sensorFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId', () => {
      it('should show sensor folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/documents', () => {
      it('should show sensor folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/documents/:sensorDocumentId/download/:filename', () => {
      it('should download sensor folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootFolder._id}/documents/${sensorFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/versions', () => {
      it('should create sensor root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download sensor root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete sensor root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId', () => {
      it('should move sensor document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: sensor._id, destination: sensorRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId', () => {
      it('should move sensor document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: sensor._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId', () => {
      it('should delete sensor document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/folders/:folderId', () => {
      it('should delete sensor folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/folders/${sensorRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums', () => {
      it('should create sensor root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          sensorRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums', () => {
      it('should create sensor root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          sensorRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums', () => {
      it('should show sensor root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show sensor root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId/photos', () => {
      it('should create sensor album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId', () => {
      it('should show sensor album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId/photos', () => {
      it('should show sensor album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId/download/:filename', () => {
      it('should download sensor photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId', () => {
      it('should move sensor photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: sensor._id, destination: sensorRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId', () => {
      it('should move sensor photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: sensor._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId', () => {
      it('should delete sensor photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/albums/:albumId', () => {
      it('should delete sensor album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/albums/${sensorRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Meters', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models', () => {
      it('should create meter model', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', attributes: { test: 'test' }, templates: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          meterModel = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models', () => {
      it('should show meter models of a sensor type', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/meter-types/:meterType/models/:modelId', () => {
      it('should update meter model', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', templates: [] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
					expect(res.body.name).to.equal('gaygay');
          meterModel = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/meter-types/:meterType/models/:modelId', () => {
      it('should show meter model detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters', () => {
      it('should create meter', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gay', metadata: [], isVirtual: false, cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          meter = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters', () => {
      it('should show meters of a model', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meters', () => {
      it('should show all meters', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meters`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/checker', () => {
      it('should check meter modelNo', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/checker`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ modelNo: sensor.modelNo })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.isExist);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId', () => {
      it('should update meter', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ modelNo: 'gaygay' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.modelNo).to.equal('gaygay');
          meter = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId', () => {
      it('should show meter detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders', () => {
      it('should create meter root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          meterRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders', () => {
      it('should create meter root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          meterRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders', () => {
      it('should show meter root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:meterDocumentId/download/:filename', () => {
      it('should download meter root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/documents', () => {
      it('should create meter folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents[0]._id);
          meterFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId', () => {
      it('should show meter folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/documents', () => {
      it('should show meter folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/documents/:meterDocumentId/download/:filename', () => {
      it('should download meter folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootFolder._id}/documents/${meterFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/versions', () => {
      it('should create meter root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download meter root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete meter root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId', () => {
      it('should move meter document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: meter._id, destination: meterRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId', () => {
      it('should move meter document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: meter._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId', () => {
      it('should delete meter document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/folders/:folderId', () => {
      it('should delete meter folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/folders/${meterRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums', () => {
      it('should create meter root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          meterRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums', () => {
      it('should create meter root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          meterRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums', () => {
      it('should show meter root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show meter root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId/photos', () => {
      it('should create meter album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId', () => {
      it('should show meter album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId/photos', () => {
      it('should show meter album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId/download/:filename', () => {
      it('should download meter photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId', () => {
      it('should move meter photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: meter._id, destination: meterRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId', () => {
      it('should move meter photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: equipmentRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: meter._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId', () => {
      it('should delete meter photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/albums/:albumId', () => {
      it('should delete meter album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${meterModel._id}/meters/${meter._id}/albums/${meterRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    // describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/readings', () => {
    //   it('should update meter readings', (done) => {
    //     const newReading = { date: new Date() };
    //     newReading[paramSet._id.toString()] = 100;
    //     const newReading1 = { date: new Date() };
    //     newReading1[paramSet._id.toString()] = 200;
    //     request(app)
    //     .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${model._id}/meters/${meter._id}/readings`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .send({ readings: [newReading, newReading1] })
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       should.exist(res.body.upserted);
    //       expect(res.body.upserted).to.have.length.above(0);
    //       reading = res.body.upserted[0];
    //       done();
    //     });
    //   });
    // });
    //
    // describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/readings', () => {
    //   it('should show meter readings', (done) => {
    //     request(app)
    //     .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${model._id}/meters/${meter._id}/readings`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       expect(res.body).to.have.length.above(0);
    //       done();
    //     });
    //   });
    // });
    //
    // describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:buildingId/meter-types/:meterType/models/:modelId/meters/:meterId/readings/:readingId', () => {
    //   it('should delete meter readings', (done) => {
    //     request(app)
    //     .delete(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/meter-types/Power Meter/models/${model._id}/meters/${meter._id}/readings/${reading._id}`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       should.exist(res.body._id);
    //       done();
    //     });
    //   });
    // });
  });

  describe('## Negaport', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports', () => {
      it('should create negaport', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', agent: 'Enerwise EM100', desc: '', timeOffset: 8, sn: 'SW0820140825202' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          negaport = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports/:negaportId', () => {
      it('should update negaport', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports/${negaport._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gaygay', agent: 'Enerwise EM100', desc: '', timeOffset: 8, sn: 'SW0820140825202' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports/:negaportId', () => {
      it('should show negaport detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports/${negaport._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          negaport = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports', () => {
      it('should show all negaports', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports/:negaportId/ports', () => {
      it('should create port', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports/${negaport._id}/ports`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ device: sensor._id, name: 'fishGay', agentSettings: { device: '1', signal: '1002112' } })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          port = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports/:negaportId/ports/:portId', () => {
      it('should update port', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports/${negaport._id}/ports/${port._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ status: 'on' })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/negaports/:negaportId/ports', () => {
      it('should show all ports', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/negaports/${negaport._id}/ports`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId', () => {
      it('should update sensor paramSets', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ paramSets: [{ paramSet: paramSet._id, port: port._id }] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          expect(res.body.paramSets.length).to.above(0);
          sensor = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/readings', () => {
      it('should update sensor readings', (done) => {
        const newReading = { date: new Date(2016, 1, 1) };
        newReading[port._id.toString()] = 100;
        const newReading1 = { date: new Date(2016, 2, 1) };
        newReading1[port._id.toString()] = 200;
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/readings`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ readings: [newReading, newReading1] })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.upserted);
          expect(res.body.upserted).to.have.length.above(0);
          reading = res.body.upserted[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/readings', () => {
      it('should show sensor readings', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/readings`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ filter: { skip: 0 } })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          readingDate = res.body[1].date;
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/asset/sites/:site/buildings/:buildingId/sensor-types/:sensorType/models/:modelId/sensors/:sensorId/readings/:readingId', () => {
      it('should delete sensor readings', (done) => {
        request(app)
        .delete(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/sensor-types/IEQ Sensor/models/${sensorModel._id}/sensors/${sensor._id}/readings/${reading._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/folders/:folderId/feature-types/:featureType/features/:featureId', () => {
      it('should create sensor type feature', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/sensor/features`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'Point', coordinates: [0, 0] })
        .then((res1) => {
          should.exist(res1.body.properties._id);
          const sensorFeature = res1.body;
          request(app)
          .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/sensor/features/${sensorFeature.properties._id}`)
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .send({ type: 'sensor', name: 'gay gay', metadata: [], sensor: sensor._id })
          .expect(httpStatus.OK)
          .then((res) => {
            should.exist(res.body.type);
            done();
          });
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/blocks/:blockId/floors/:floorId/sensor-types/:sensorType/paramsets/:paramSetId/readings', () => {
      it('should show floor features with sensor reading', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/sensor-types/IEQ Sensor/paramsets/${paramSet._id}/readings`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        // .query({ isMean: false, date: new Date(2016, 2, 1) })
        .query({ isMean: true, dateFrom: new Date(2016, 1, 1), dateTo: new Date(2017, 2, 1) })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    // describe('# GET /asset/sites/:site/buildings/:buildingId/paramsets/checker', () => {
    //   it('should check paramSet name', (done) => {
    //     request(app)
    //     .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/paramsets/checker`)
    //     .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
    //     .query({ name: paramSet.name })
    //     .expect(httpStatus.OK)
    //     .then((res) => {
    //       should.exist(res.body.isExist);
    //       done();
    //     });
    //   });
    // });
  });

  describe('## Locations', () => {
    describe('# POST /v0.1.0/asset/sites/:site/buildings/:buildingId/locations', () => {
      it('should create location', (done) => {
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/locations`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', desc: 'gay', floor: floor._id, isCrossFloor: false, attributes: {}, area: { value: 0, unit: 'm2' } })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          location = res.body;
          done();
        });
      });
    });

    describe('# GET /asset/sites/:site/buildings/:buildingId/locations', () => {
      it('should show locations', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/locations`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/asset/sites/:site/buildings/:building/locations/:locationId', () => {
      it('should update location', (done) => {
        request(app)
        .put(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/locations/${location._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'gay', desc: 'gay', floor: floor._id, isCrossFloor: false, attributes: {}, area: { value: 0, unit: 'm2' } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          location = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/sites/:site/buildings/:building/locations/:locationId', () => {
      it('should show location detail', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/locations/${location._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders', () => {
      it('should create location root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', cTags: ['gay'], desc: '' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          locationRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders', () => {
      it('should create location root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          locationRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders', () => {
      it('should show location root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:locationDocumentId/download/:filename', () => {
      it('should download location root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId/documents', () => {
      it('should create location folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          // locationRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId', () => {
      it('should show location folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId/documents', () => {
      it('should show location folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:locationDocumentId/versions', () => {
      it('should create location root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:locationDocumentId/versions/:documentVersionId/download/:filename', () => {
      it('should download location root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}/versions/${documentVersion._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:locationDocumentId/versions/:documentVersionId', () => {
      it('should delete location root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId/documents/:locationDocumentId/download/:filename', () => {
      it('should download location folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootFolder._id}/documents/${locationRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId', () => {
      it('should move location document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: location._id, destination: locationRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId', () => {
      it('should move location document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: location._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId', () => {
      it('should delete location document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/folders/:folderId', () => {
      it('should delete location folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/folders/${locationRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums', () => {
      it('should create location root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          locationRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums', () => {
      it('should create location root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          locationRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums', () => {
      it('should show location root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show location root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId/photos', () => {
      it('should create location album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // locationRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId', () => {
      it('should show location album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/:albumId/photos', () => {
      it('should show location album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId/download/:filename', () => {
      it('should download location photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId', () => {
      it('should move location photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: locationRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: location._id, destination: locationRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId', () => {
      it('should move location photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: locationRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: location._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId', () => {
      it('should delete location photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/locations/:locationId/albums/:albumId', () => {
      it('should delete location album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/locations/${location._id}/albums/${locationRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Meter Structures', () => {
  });

  describe('## Documents', () => {
    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders', () => {
      it('should create system root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', cTags: ['gay'], desc: '' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders', () => {
      it('should create system root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders', () => {
      it('should show system root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:systemDocumentId/download/:filename', () => {
      it('should download system root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/documents', () => {
      it('should create system folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId', () => {
      it('should show system folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/documents', () => {
      it('should show system folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/documents/:systemDocumentId/download/:filename', () => {
      it('should download system folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootFolder._id}/documents/${systemFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/versions', () => {
      it('should create system root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download system root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete system root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/folders/${systemRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums', () => {
      it('should create system root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums', () => {
      it('should create system root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          systemRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums', () => {
      it('should show system root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show system root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums/:albumId/photos', () => {
      it('should create system album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums/:albumId', () => {
      it('should show system album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums/${systemRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums/:albumId/photos', () => {
      it('should show system album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/albums/:albumId/download/:filename', () => {
      it('should download system photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/albums/${systemRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subSystems/:subsystemId/folders', () => {
      it('should create subsystem root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders', () => {
      it('should create subsystem root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders', () => {
      it('should show subsystem root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:systemDocumentId/download/:filename', () => {
      it('should download subsystem root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/documents', () => {
      it('should create subsystem folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId', () => {
      it('should show subsystem folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/documents', () => {
      it('should show subsystem folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/documents/:systemDocumentId/download/:filename', () => {
      it('should download subsystem folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootFolder._id}/documents/${systemFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/versions', () => {
      it('should create subsystem root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download subsystem root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete subsystem root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/folders/${systemRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums', () => {
      it('should create subsystem root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums', () => {
      it('should create subsystem root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          systemRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums', () => {
      it('should show subsystem root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show subsystem root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums/:albumId/photos', () => {
      it('should create subsystem album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums/:albumId', () => {
      it('should show subsystem album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums/${systemRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums/:albumId/photos', () => {
      it('should show subsystem album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/albums/:albumId/download/:filename', () => {
      it('should download subsystem photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/albums/${systemRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subSystems/:subsystemId/types/:typeId/folders', () => {
      it('should create type root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders', () => {
      it('should create type root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders', () => {
      it('should show type root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:systemDocumentId/download/:filename', () => {
      it('should download type root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/documents', () => {
      it('should create type folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          systemFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId', () => {
      it('should show type folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/documents', () => {
      it('should show type folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/documents/:systemDocumentId/download/:filename', () => {
      it('should download type folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootFolder._id}/documents/${systemFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/versions', () => {
      it('should create type root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}/versions`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download type root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete type root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId', () => {
      it('should move system document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: systemType._id, destination: systemRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId', () => {
      it('should move system document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: systemType._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId', () => {
      it('should delete system document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/folders/:folderId', () => {
      it('should delete system folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/folders/${systemRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums', () => {
      it('should create type root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          systemRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums', () => {
      it('should create type root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          systemRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums', () => {
      it('should show type root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show type root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId/photos', () => {
      it('should create type album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId', () => {
      it('should show type album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId/photos', () => {
      it('should show type album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId/download/:filename', () => {
      it('should download type photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId', () => {
      it('should move type photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: systemRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: systemType._id, destination: systemRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId', () => {
      it('should move type photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: systemRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: systemType._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId', () => {
      it('should delete type photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/systems/:systemId/subsystems/:subsystemId/types/:typeId/albums/:albumId', () => {
      it('should delete type album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/systems/${system._id}/subsystems/${systemSubsystem._id}/types/${systemType._id}/albums/${systemRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Submissions', () => {
    describe('# POST /v0.1.0/bsm/certificates', () => {
      it('should create certificate', (done) => {
        request(app)
        .post('/v0.1.0/bsm/certificates')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            association: 'LEED',
            certificate: 'Building Design and Construction',
            version: 'v4.0'
          },
          zho_hk: {
            association: 'LEED',
            certificate: 'Building Design and Construction',
            version: 'v4.0'
          },
          zho_cn: {
            association: 'LEED',
            certificate: 'Building Design and Construction',
            version: 'v4.0'
          }
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          certificate = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/certificates/:certificateId', () => {
      it('should update certificate', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/certificates/${certificate._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            association: 'LEED',
            certificate: 'Building Design and Construction',
            version: 'v4.0'
          },
          zho_hk: {
            association: 'LEED',
            certificate: 'Building Design and Construction 香港呀屌',
            version: 'v4.0'
          },
          zho_cn: {
            association: 'LEED',
            certificate: 'Building Design and Construction',
            version: 'v4.0'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates/:certificateId', () => {
      it('should show certificate detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/certificates/${certificate._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates', () => {
      it('should show all certificates', (done) => {
        request(app)
        .get('/v0.1.0/bsm/certificates')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/certificates/:certificateId/sections', () => {
      it('should create section', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/certificates/${certificate._id}/sections`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            section: 'LOCATION AND TRANSPORATION (LT)'
          },
          zho_hk: {
            section: 'LOCATION AND TRANSPORATION (LT)'
          },
          zho_cn: {
            section: 'LOCATION AND TRANSPORATION (LT)'
          }
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          certificateSection = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId', () => {
      it('should update section', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            section: 'LOCATION AND TRANSPORATION (LT)'
          },
          zho_hk: {
            section: 'LOCATION AND TRANSPORATION (LT)香港呀屌'
          },
          zho_cn: {
            section: 'LOCATION AND TRANSPORATION (LT)'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId', () => {
      it('should show section detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates/:certificateId/sections', () => {
      it('should show all sections', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/certificates/${certificate._id}/sections`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId/subsections', () => {
      it('should create subsection', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}/subsections`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION'
          },
          zho_hk: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION'
          },
          zho_cn: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION'
          }
        })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          certificateSubsection = res.body;
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId/subsections/:subsectionId', () => {
      it('should update subsection', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          eng: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION'
          },
          zho_hk: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION香港呀屌'
          },
          zho_cn: {
            subsection: 'LT CREDIT: LEED FOR NEIGHBORHOOD DEVELOPMENT LOCATION'
          }
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId/subsections/:subsectionId', () => {
      it('should show subsection detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/certificates/:certificateId/sections/:sectionId/subsections', () => {
      it('should show all subsections', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/certificates/${certificate._id}/sections/${certificateSection._id}/subsections`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({
          lang: 'zho_hk'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions', () => {
      it('should create edition', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ name: 'fishGay' })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          edition = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions', () => {
      it('should show editions', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId', () => {
      it('should show edition detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders', () => {
      it('should create certificate root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders', () => {
      it('should create certificate root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders', () => {
      it('should show certificate root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders/:submissionDocumentId/download/:filename', () => {
      it('should download certificate root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders/${submissionRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders/:folderId/documents', () => {
      it('should create certificate folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders/:folderId', () => {
      it('should show certificate folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders/${submissionRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders/:folderId/documents', () => {
      it('should show certificate folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/folders/:folderId/documents/:submissionDocumentId/download/:filename', () => {
      it('should download certificate folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/folders/${submissionRootFolder._id}/documents/${submissionFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums', () => {
      it('should create edition root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums', () => {
      it('should create edition root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          submissionRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums', () => {
      it('should show edition root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show edition root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums/:albumId/photos', () => {
      it('should create edition album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums/:albumId', () => {
      it('should show edition album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums/${submissionRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums/:albumId/photos', () => {
      it('should show edition album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/albums/:albumId/download/:filename', () => {
      it('should download edition photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/albums/${submissionRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders', () => {
      it('should create section root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders', () => {
      it('should create section root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders', () => {
      it('should show section root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:submissionDocumentId/download/:filename', () => {
      it('should download section root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/documents', () => {
      it('should create section folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId', () => {
      it('should show section folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/documents', () => {
      it('should show section folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/documents/:submissionDocumentId/download/:filename', () => {
      it('should download section folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootFolder._id}/documents/${submissionFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/versions', () => {
      it('should create section root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download section root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete section root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/folders/${submissionRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums', () => {
      it('should create section root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums', () => {
      it('should create section root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          submissionRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums', () => {
      it('should show section root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show section root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums/:albumId/photos', () => {
      it('should create section album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums/:albumId', () => {
      it('should show section album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums/${submissionRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums/:albumId/photos', () => {
      it('should show section album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/albums/:albumId/download/:filename', () => {
      it('should download section photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/albums/${submissionRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders', () => {
      it('should create subsection root folder', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'folders', name: 'gay', desc: '', cTags: ['gay'] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootFolder = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders', () => {
      it('should create subsection root document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionRootDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders', () => {
      it('should show subsection root documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:submissionDocumentId/download/:filename', () => {
      it('should download subsection root document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/documents', () => {
      it('should create subsection folder\'s document', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.documents);
          submissionFolderDocument = res.body.documents[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId', () => {
      it('should show subsection folder detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootFolder._id}`)
        // .query({
        //   filter: { type: 'folders' }
        // })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/documents', () => {
      it('should show subsection folder\'s documents', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootFolder._id}/documents`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/documents/:submissionDocumentId/download/:filename', () => {
      it('should download subsection folder\'s document', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootFolder._id}/documents/${submissionFolderDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/versions', () => {
      it('should create subsection root document version', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}/versions`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          // documentVersion = {
          //   _id: res.body.oldVersion
          // };
          // should.exist(res.body.total);
          // expect(res.body.total.document).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/versions/:documentVersionId/download/:filename', () => {
      it('should download subsection root document version', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}/download/testfile.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId/versions/:documentVersionId', () => {
      it('should delete subsection root document version', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}/versions/${documentVersion._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body.current);
          should.exist(res.body.deleted);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId', () => {
      it('should move submission document to folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: certificateSubsection._id, destination: submissionRootFolder._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId', () => {
      it('should move submission document to root folder', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'documents', name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: certificateSubsection._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId', () => {
      it('should delete submission document', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootDocument._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/folders/:folderId', () => {
      it('should delete feature folder', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/folders/${submissionRootFolder._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums', () => {
      it('should create subsection root album', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'albums', name: 'gay', desc: '', cTags: [] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body._id);
          submissionRootAlbum = res.body;
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums', () => {
      it('should create subsection root photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          submissionRootPhoto = res.body.photos[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums', () => {
      it('should show subsection root album photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(1);
          done();
        });
      });
      it('should show subsection root album photos group by upload date', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums`)
        .query({
          byTime: { precision: 'day', tzOffset: 8 }
        })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId/photos', () => {
      it('should create subsection album\'s photo', (done) => {
        request(app)
        .post(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'photos', cTags: ['gay'], desc: '', uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.photos);
          // floorRootDocument = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId', () => {
      it('should show subsection album detail', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          should.exist(res.body.total);
          expect(res.body.total.photo).to.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId/photos', () => {
      it('should show subsection album\'s photos', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootAlbum._id}/photos`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId/download/:filename', () => {
      it('should download subsection photo', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootPhoto._id}/download/test.jpg`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId', () => {
      it('should move subsection photo to album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: submissionRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: certificateSubsection._id, destination: submissionRootAlbum._id } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId', () => {
      it('should move subsection photo to root album', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: submissionRootPhoto.type, name: 'fishGay', cTags: ['gay'], desc: 'desc', location: { asset: certificateSubsection._id, destination: null } })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId', () => {
      it('should delete subsection photo', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootPhoto._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/certificates/:certificateId/editions/:editionId/sections/:sectionId/subsections/:subsectionId/albums/:albumId', () => {
      it('should delete subsection album', (done) => {
        request(app)
        .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/certificates/${certificate._id}/editions/${edition._id}/sections/${certificateSection._id}/subsections/${certificateSubsection._id}/albums/${submissionRootAlbum._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Weathers', () => {
    describe('# PUT /v0.1.0/asset/weathers', () => {
      it('should update weather', (done) => {
        request(app)
        .put('/v0.1.0/asset/weathers')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ weathers: [
          { date: new Date(2017, 2, 14), airport: 'VHHH', temp: 22, dewPt: 12, humidity: 50, pressure: 1081, windDir: 'E', windSpeed: 9, condition: 'Cloudy', mContent: 0.00615775 },
          { date: new Date(2017, 2, 15), airport: 'VHHH', temp: 23, dewPt: 12, humidity: 50, pressure: 1081, windDir: 'E', windSpeed: 9, condition: 'Cloudy', mContent: 0.00615775 },
          { date: new Date(2017, 3, 1), airport: 'VHHH', temp: 30, dewPt: 12, humidity: 50, pressure: 1081, windDir: 'E', windSpeed: 9, condition: 'Cloudy', mContent: 0.00615775 }
        ] })
        .expect(httpStatus.OK)
        .then((res) => {
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /v0.1.0/asset/weathers/breakdown', () => {
      it('should update break down weathers', (done) => {
        request(app)
        .post('/v0.1.0/asset/weathers/breakdown')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ from: new Date(2017, 2, 14), to: new Date(2017, 3, 1), airport: 'VHHH' })
        .expect(httpStatus.OK)
        .then((res) => {
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/asset/weathers', () => {
      it('should show weathers', (done) => {
        request(app)
        .get('/v0.1.0/asset/weathers')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ from: new Date(2017, 2, 14), to: new Date(2017, 3, 1), airport: 'VHHH' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  describe('## Bills', () => {
    describe('# PUT /v0.1.0/erm/sites/:site/buildings/:buildingId/bills', () => {
      it('should update bills', (done) => {
        request(app)
        .put(`/v0.1.0/erm/sites/${site._id}/buildings/${building._id}/bills`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({
          bills: [
            {
              from: new Date(2017, 2, 1),
              to: new Date(2017, 3, 1),
              calFactor: 0.125,
              electricity: {
                conOnPeak: 100,
                conOffPeak: 200,
                conTotal: 300,
                demandChargeOnPeak: 400,
                demandChargeOffPeak: 500,
                fee: 600
              },
              gas: {
                conOnPeak: 100,
                conOffPeak: 200,
                conTotal: 300,
                fee: 400
              },
              water: {
                conTotal: 100,
                fee: 200
              }
            },
            {
              from: new Date(2017, 3, 1),
              to: new Date(2017, 4, 1),
              calFactor: 0.125,
              electricity: {
                conOnPeak: 200,
                conOffPeak: 300,
                conTotal: 400,
                demandChargeOnPeak: 500,
                demandChargeOffPeak: 600,
                fee: 700
              },
              gas: {
                conOnPeak: 200,
                conOffPeak: 300,
                conTotal: 400,
                fee: 500
              },
              water: {
                conTotal: 200,
                fee: 300
              }
            },
            {
              from: new Date(2017, 4, 1),
              to: new Date(2017, 5, 1),
              calFactor: 0.125,
              electricity: {
                conOnPeak: 200,
                conOffPeak: 300,
                conTotal: 400,
                demandChargeOnPeak: 500,
                demandChargeOffPeak: 600,
                fee: 700
              },
              gas: {
                conOnPeak: 200,
                conOffPeak: 300,
                conTotal: 400,
                fee: 500
              },
              water: {
                conTotal: 200,
                fee: 300
              }
            }
        ]
        })
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/erm/sites/:site/buildings/:buildingId/bills', () => {
      it('should show all bills', (done) => {
        request(app)
        .get(`/v0.1.0/erm/sites/${site._id}/buildings/${building._id}/bills`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          bill = res.body[0];
          done();
        });
      });
    });

    describe('# GET /v0.1.0/erm/sites/:site/buildings/:buildingId/bills/:billId', () => {
      it('should show a bill', (done) => {
        request(app)
        .get(`/v0.1.0/erm/sites/${site._id}/buildings/${building._id}/bills/${bill._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/erm/sites/:site/buildings/:buildingId/bills/chart', () => {
      it('should show bill chart', (done) => {
        request(app)
        .get(`/v0.1.0/erm/sites/${site._id}/buildings/${building._id}/bills/chart`)
        .query({ type: 'weather', bill: { calFactor: true, field: { target: 'electricity.conTotal' } }, weather: { field: { target: 'temp' } } })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.bill.dates).to.have.length.above(0);
          // bill = res.body[0];
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/erm/sites/:site/buildings/:buildingId/bills', () => {
      it('should delete multiple bills', (done) => {
        request(app)
        .delete(`/v0.1.0/erm/sites/${site._id}/buildings/${building._id}/bills`)
        .query({ _ids: [bill._id, bill._id] })
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._ids);
          done();
        });
      });
    });
  });

  describe('## Tags', () => {
    describe('# GET /v0.1.0/asset/sites/:site/buildings/:buildingId/custom-tags', () => {
      it('should show custom-tags', (done) => {
        request(app)
        .get(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/custom-tags`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .query({ keyword: 'ga', limit: 5 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  describe('## Trashes', () => {
    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/feature/trashes', () => {
      it('should show all feature trashes', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/feature/trashes`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          trashes = res.body;
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/feature/trashes/:trashFeatureId', () => {
      it('should show feature trash', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/feature/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/feature/trashes/:trashFeatureId', () => {
      it('should restore feature trash', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/feature/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/feature/trashes/:trashFeatureId', () => {
      it('should permanently delete feature trash', (done) => {
        let featureId;
        request(app)
        .post(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ type: 'Point', coordinates: [0, 0] })
        .expect(httpStatus.CREATED)
        .then((res) => {
          should.exist(res.body.properties._id);
          featureId = res.body.properties._id;
          return request(app)
          .delete(`/v0.1.0/asset/sites/${site._id}/buildings/${building._id}/blocks/${block._id}/floors/${floor._id}/feature-types/test/features/${featureId}`)
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .expect(httpStatus.OK);
        }).then((res) => {
          should.exist(res.body._id);
          return request(app)
          .delete(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/feature/trashes/${featureId}`)
          .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
          .expect(httpStatus.OK);
        }).then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/document/trashes', () => {
      it('should show all document trashes', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/document/trashes`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          trashes = res.body;
          // console.log(trashes[0]);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/document/trashes/:trashDocumentId', () => {
      it('should show document trash', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/document/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/document/trashes/:trashDocumentId', () => {
      it('should restore document trash', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/document/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/document/trashes/:trashDocumentId', () => {
      it('should permanently delete document trash', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/document/trashes/${trashes[1]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/photo/trashes', () => {
      it('should show all photo trashes', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/photo/trashes`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          trashes = res.body;
          // console.log(trashes[0]);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/photo/trashes/:trashPhotoId', () => {
      it('should show photo trash', (done) => {
        request(app)
        .get(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/photo/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# PUT /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/photo/trashes/:trashPhotoId', () => {
      it('should restore photo trash', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/photo/trashes/${trashes[0]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });

    describe('# DELETE /v0.1.0/bsm/sites/:site/buildings/:buildingId/trash-types/photo/trashes/:trashPhotoId', () => {
      it('should permanently delete photo trash', (done) => {
        request(app)
        .put(`/v0.1.0/bsm/sites/${site._id}/buildings/${building._id}/trash-types/photo/trashes/${trashes[1]._id}`)
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          should.exist(res.body._id);
          done();
        });
      });
    });
  });

  describe('## Utility', () => {
    describe('# /v0.1.0/utility/emails', () => {
      it('should send mass emails', (done) => {
        request(app)
        .post('/v0.1.0/utility/emails')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .send({ subject: 'test email', receipant: { isAll: false, groups: [], users: [decodedRoot._id, decodedMe._id] }, template: 'updateBSM' })
        .expect(httpStatus.OK)
        .then((res) => {
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/language-list', () => {
      it('should show language list', (done) => {
        request(app)
        .get('/v0.1.0/utility/language-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/meter-type-list', () => {
      it('should show meter type list', (done) => {
        request(app)
        .get('/v0.1.0/utility/meter-type-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/sensor-type-list', () => {
      it('should show sensor type list', (done) => {
        request(app)
        .get('/v0.1.0/utility/sensor-type-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/parameter-category-list', () => {
      it('should show parameter category list', (done) => {
        request(app)
        .get('/v0.1.0/utility/parameter-category-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/negaport-agent-list', () => {
      it('should show negaport agent list', (done) => {
        request(app)
        .get('/v0.1.0/utility/negaport-agent-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/device-list', () => {
      it('should show device list', (done) => {
        request(app)
        .get('/v0.1.0/utility/device-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# GET /v0.1.0/utility/permission-list', () => {
      it('should show permission list', (done) => {
        request(app)
        .get('/v0.1.0/utility/permission-list')
        .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  describe('## EM100', () => {
    describe('# POST /EMSCloud/DataUpload', () => {
      it('註冊項目 101', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8'?><req data='101' ><prj sn='SW0820140825202' createdTm='1474969875' ><reg type='EM100' name='Part6 B' tz='+08:00' lang='1' license='APP-SERVER' logFreq='10' logDuration='31' install='2016-04-28' country='' city='' loc='cccc' longitude='12.0000000' latitude='23.0000000' /></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /EMSCloud/DataUpload', () => {
      it('用戶自定義配置 201', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .set('enerwise-project-sn', 'SW0820140825202')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8' ?><req data='201' ><prj sn='SW0820140825202' createdTm='1234567890' ></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /EMSCloud/DataUpload', () => {
      it('站點配置 202', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .set('enerwise-project-sn', 'SW0820140825202')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8' ?><req data='202' ><prj sn='SW0820140825202' createdTm='1234567890' ></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /EMSCloud/DataUpload', () => {
      it('設備配置 203', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .set('enerwise-project-sn', 'SW0820140825202')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8' ?><req data='203' ><prj sn='SW0820140825202' createdTm='1234567890' ></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /EMSCloud/DataUpload', () => {
      it('信號配置 204', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .set('enerwise-project-sn', 'SW0820140825202')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8'?><req data='204' ><prj sn='SW0820140825202' createdTm='1474970586' ><item siteId='99' devId='1' sigId='501' name='AI1' alias='Temp.' unit='℃' status='1' /><item siteId='99' devId='1' sigId='502' name='AI2' alias='LED2' unit='pcs' status='1' /><item siteId='99' devId='1' sigId='503' name='AI3' alias='Fan' unit='pcs' status='1' /><item siteId='99' devId='1' sigId='504' name='AI4' alias='空调' unit='V' status='1' /><item siteId='99' devId='1' sigId='505' name='AI5' alias='바람 속도' unit='m/s' status='1' /><item siteId='99' devId='1' sigId='506' name='AI6' alias='CO' unit='ppm' status='0' /><item siteId='99' devId='1' sigId='701' name='DI1' alias='' unit='' status='1' /><item siteId='99' devId='1' sigId='702' name='DI2' alias='' unit='' status='1' /><item siteId='99' devId='1' sigId='703' name='DI3' alias='' unit='' status='1' /><item siteId='99' devId='1' sigId='704' name='DI4' alias='' unit='' status='1' /><item siteId='99' devId='1' sigId='705' name='DI5' alias='' unit='' status='1' /><item siteId='99' devId='1' sigId='706' name='DI6' alias='' unit='' status='1' /></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });

    describe('# POST /EMSCloud/DataUpload', () => {
      it('實時測量數據 301', (done) => {
        request(app)
        .post('/EMSCloud/DataUpload')
        .set('enerwise-project-sn', 'SW0820140825202')
        .type('form')
        .send("<?xml version='1.0' encoding='UTF-8' ?><req data='301' ><prj sn='SW0820140825202' createdTm='1234567890' ><dev id='1' ><item sigId='1002112' val='241.3608092' tm='1475029126' /></dev></prj></req>")
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.text);
          // expect(res.body).to.have.length.above(0);
          done();
        });
      });
    });
  });

  // describe('## Test', () => {
  //   describe('# POST /v0.1.0/test', () => {
  //     it('should test', (done) => {
  //       request(app)
  //       .post('/v0.1.0/test')
  //       .set('Authorization', `Bearer ${credentialRoot.accessToken}`)
  //       .send({ uploadedDocs: [{ name: 'icon1.jpg', type: 'jpg' }] })
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         done();
  //       });
  //     });
  //   });
  // });
});
