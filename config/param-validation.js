const Joi = require('joi');
const joiObjectid = require('joi-objectid');
const staticInfo = require('../server/helpers/staticInfo');

Joi.objectId = joiObjectid(Joi);

module.exports = {
	// POST /users
	createUser: {
		body: {
			email: Joi.string().email().required(),
			username: Joi.string().min(1).max(200).required(),
			password: Joi.string().min(8).max(20).required()
			// invitation: Joi.objectId().optional()
		}
	},

	// POST /users/login
	localLogin: {
		body: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			group: Joi.string().optional()
		}
	},

	// POST /users/reset-password/:token
	resetPassword: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			_id: Joi.objectId().required(),
			password: Joi.string().min(8).max(20).required(),
			group: Joi.objectId().optional()
		}
	},

	// POST /users/confirmation/:token
	confirmAccount: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			_id: Joi.objectId().required()
		}
	},

	// POST /users/forget-password
	forgetPassword: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			email: Joi.string().email().required(),
			group: Joi.string().min(1).optional()
		}
	},

	// POST /users/logout
	logoutUser: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			clientId: Joi.objectId().required()
		}
	},

	// POST /users/token
	refreshAccessToken: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			clientId: Joi.objectId().required(),
			refreshToken: Joi.string().required(),
			user: Joi.objectId().required(),
			group: Joi.objectId().allow(null).optional()
		}
	},

	// POST /users/logged-in
	checkLoggedIn: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			clientId: Joi.objectId().required(),
			refreshToken: Joi.string().required(),
			user: Joi.string().required()
		}
	},

	// GET /users/checker/email
	checkEmail: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			email: Joi.string().email().required(),
		}
	},

	// GET /users/me/settings
	updateMySettings: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			preset: {
				site: Joi.objectId().allow(null).required(),
				building: Joi.objectId().allow(null).required(),
				language: Joi.string().allow(null).required()
			}
		}
	},

	// POST /groups
	createGroup: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).max(200).required(),
			password: Joi.string().min(8).max(20).required(),
			code: Joi.string().trim().min(3).required(),
			address: Joi.string().min(1).max(500).optional(),
			contact: Joi.string().min(1).max(500).optional(),
			email: Joi.string().email().optional()
		}
	},

	// PUT /groups/:groupId
	updateGroup: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).max(200).required(),
			address: Joi.string().min(1).max(500).optional(),
			contact: Joi.string().min(1).max(500).optional(),
			email: Joi.string().email().optional(),
			code: Joi.string().trim().min(3).required()
		}
	},

	// PUT /groups/:groupId/status
	updateGroupStatus: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			status: Joi.string().valid(['pending', 'approved', 'deleted', 'suspending']).required()
		}
	},

	checkGroup: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			code: Joi.string().min(1).trim().optional()
		}
	},

	// PUT /groups/:groupId/code
	updateGroupCode: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			code: Joi.string().required()
		}
	},

	// POST /groups/:groupId/invitations
	inviteGroupMember: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			user: Joi.objectId().required()
		}
	},

	// POST /users/me/group-invitations/:groupId
	acceptGroupInvitation: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			password: Joi.string().min(8).max(20).required()
		}
	},

	// POST /groups/:groupId/admins
	createGroupAdmin: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			user: Joi.objectId().required()
		}
	},

	// POST /groups/:groupId/roles
	createRole: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			whitelist: Joi.array().items(Joi.object({
				isOverride: Joi.boolean().required(),
				methods: Joi.array().items(Joi.string().valid(['*', 'get', 'put', 'post', 'delete', 'patch'])).required(),
				url: Joi.string().min(1).trim().required(),
				metadata: Joi.object().required()
			})).required(),
		}
	},

	// PUT /groups/:groupId/roles/:roleId
	updateRole: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			whitelist: Joi.array().items(Joi.object({
				isOverride: Joi.boolean().required(),
				methods: Joi.array().items(Joi.string().valid(['*', 'get', 'put', 'post', 'delete', 'patch'])).required(),
				url: Joi.string().min(1).trim().required(),
				metadata: Joi.object().required()
			})).required(),
		}
	},

	// POST /groups/:groupId/roles/check
	checkRole: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			name: Joi.string().min(1).trim().optional(),
		}
	},

	// GET /groups/:groupId/roles/:roleId/users
	showRoleUsers: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			notRole: Joi.boolean().optional(),
		}
	},

	// POST /groups/:groupId/roles/:roleId/users
	createRoleUsers: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			users: Joi.array().items(Joi.objectId()).required(),
		}
	},

	// DELETE /groups/:groupId/roles/:roleId/users
	deleteRoleUsers: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			users: Joi.array().items(Joi.objectId()).required(),
		}
	},

	// POST /asset/sites
	createSite: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			country: Joi.string().required(),
			district: Joi.string().required(),
			name: Joi.string().required(),
			group: Joi.objectId().required()
		}
	},

	// PUT /asset/sites/:siteId
	updateSite: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			country: Joi.string().required(),
			district: Joi.string().required(),
			name: Joi.string().required()
			// group: Joi.objectId().required()
		}
	},

	updateSiteGroup: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			group: Joi.objectId().required()
		}
	},

	// POST /asset/sites/:siteId/buildings
	createSiteBuilding: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required(),
			airport: Joi.string().required()
		}
	},

	allBuildings: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				package: Joi.string().trim().allow(['bsm', 'erm', 'cam']).optional()
			}
		}
	},

	// PUT /asset/buildings/:buildingId
	updateBuilding: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required(),
			airport: Joi.string().required()
		}
	},

	// PUT /asset/buildings/:buildingId/packages
	updateBuildingPackages: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			bsm: {
				isActivated: Joi.boolean().required(),
				expiry: Joi.date().required()
			},
			erm: {
				isActivated: Joi.boolean().required(),
				expiry: Joi.date().required()
			},
			cam: {
				isActivated: Joi.boolean().required(),
				expiry: Joi.date().required()
			},
			all: {
				storageLimit: Joi.number().min(0).required()
			}
		}
	},

	updateBuildingSite: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			site: Joi.objectId().required()
		}
	},

	// PUT /asset/buildings/:buildingId/floors/order
	updateBuildingFloorsOrder: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			order: Joi.array().items(Joi.objectId()).unique().required()
		}
	},

	// POST /asset/buildings/:buildingId/blocks
	createBuildingBlock: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required(),
			description: Joi.string().optional(),
			isSchematic: Joi.boolean().required()
		}
	},

	// PUT /asset/buildings/:buildingId/blocks/:blockId
	updateBlock: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required(),
			description: Joi.string().optional(),
			isSchematic: Joi.boolean().required()
		}
	},

	showBuildingBlocks: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				isSchematic: Joi.boolean().optional()
			}
		}
	},

	// POST /asset/buildings/:buildingId/floors
	createBuildingFloors: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required(),
			airport: Joi.string().required()
		}
	},

	// PUT /asset/floors/:floorId
	updateFloor: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().required()
		}
	},

	// POST /asset/sites/:site/buildings/:buildingId/floors/:floorId/feature-types/:featureType/features
	createFloorFeature: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().required(),
			coordinates: Joi.array().required()
		}
	},

	// GET /asset/floors/:floorId/heatmap
	showFloorHeatmap: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			featureType: Joi.string().required(),
			attribute: Joi.string().required()
		}
	},

	// PUT /asset/floors/:floorId/area
	updateFloorArea: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			area: Joi.number().min(0).required(),
			unit: Joi.string().valid(['m2', 'ft2']).required()
		}
	},

	// PUT /asset/features/:featureId
	updateFeature: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().optional(),
			type: Joi.string().required(),
			metadata: Joi.array().items(Joi.object({
				_id: Joi.objectId().optional(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).optional(),
			loc: Joi.object().optional(),
			floor: Joi.objectId().optional(),
			equipment: Joi.objectId().when('type', { is: 'equipment', then: Joi.required(), otherwise: Joi.optional() }),
			sensor: Joi.objectId().when('type', { is: 'sensor', then: Joi.required(), otherwise: Joi.optional() }),
			meter: Joi.objectId().when('type', { is: 'meter', then: Joi.required(), otherwise: Joi.optional() }),
			location: Joi.objectId().when('type', { is: 'location', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	// GET /asset/building-areas/:buildingAreas
	showAllLocations: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			buildingId: Joi.objectId().required(),
			floorId: Joi.objectId()
		}
	},

	// POST /asset/building-areas
	createLocation: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			floor: Joi.objectId(),
			feature: Joi.objectId(),
			name: Joi.string().required(),
			desc: Joi.string().allow('').required(),
			isCrossFloor: Joi.boolean().required(),
			attributes: Joi.object().required(),
			area: {
				value: Joi.number().min(0).required(),
				unit: Joi.string().valid(['m2', 'ft2']).required()
			}
		}
	},

	// PUT /asset/building-areas
	updateLocation: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			floor: Joi.objectId(),
			feature: Joi.objectId(),
			name: Joi.string().required(),
			desc: Joi.string().allow('').required(),
			isCrossFloor: Joi.boolean().required(),
			attributes: Joi.object().required(),
			area: {
				value: Joi.number().min(0).required(),
				unit: Joi.string().valid(['m2', 'ft2']).required()
			}
		}
	},

	createLocationDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateLocationDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createLocationPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateLocationPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// GET /bsm/sites/:site/buildings/:buildingId/floors/:floorId/folders
	showDocuments: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				isTreeSearch: Joi.boolean(),
				type: Joi.string().valid(['documents', 'folders']),
				cTag: Joi.string().min(1).trim(),
				system: Joi.objectId(),
				name: Joi.string().min(1).trim()
			}
		}
	},

	showAlbumPhotos: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				isTreeSearch: Joi.boolean(),
				type: Joi.string().valid(['photos', 'albums']),
				cTag: Joi.string().min(1).trim(),
				name: Joi.string().min(1).trim()
			},
			byTime: {
				tzOffset: Joi.number().optional(),
				precision: Joi.string().valid(['year', 'month', 'day']).optional()
			}
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/floors/:floorId/folders
	createFloorDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			system: Joi.objectId().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	// PUT /bsm/sites/:site/buildings/:buildingId/floors/:floorId/folders/:documentFolderId
	updateFloorDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			system: Joi.objectId().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createFloorPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateFloorPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /asset/sites/:site/buildings/:buildingId/feature-types
	createFeatureType: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			templates: Joi.array().items(Joi.object({
				field: Joi.string().min(1).trim().invalid(staticInfo.defaultFeatureTypeList()).required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).required()
		}
	},

	// PUT /asset/sites/:site/buildings/:buildingId/feature-types/:faetureName
	updateFeatureType: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			templates: Joi.array().items(Joi.object({
				_id: Joi.objectId().optional(),
				field: Joi.string().min(1).trim().invalid(staticInfo.defaultFeatureTypeList()).required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).required()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/floors/:floorId/feature-types/:featureType/features/:featureId/folders
	createFeatureDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			system: Joi.objectId().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	// PUT /bsm/sites/:site/buildings/:buildingId/floors/:floorId/feature-types/:featureType/features/:featureId/folders/:documentFolderId
	updateFeatureDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			system: Joi.objectId().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/floors/:floorId/feature-types/:featureType/features/:featureId/albums
	createFeaturePhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	// PUT /bsm/sites/:site/buildings/:buildingId/floors/:floorId/feature-types/:featureType/features/:featureId/albums/:albumPhotoId
	updateFeaturePhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /bsm/sites/:site/buildings/:building/systems/:system/subSystems/:subSystem/folders
	createSystemDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSystemDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createSystemPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'albums', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'photos', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSystemPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /asset/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models
	createModel: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			attributes: Joi.object().required(),
			templates: Joi.array().items(Joi.object({
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).required()
		}
	},

	// PUT /asset/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models/:modelId
	updateModel: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().optional(),
			attributes: Joi.object().optional(),
			system: Joi.objectId().optional(),
			templates: Joi.array().items(Joi.object({
				_id: Joi.objectId().optional(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).optional()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models/:modelId/folders
	createModelDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateModelDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createModelPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateModelPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	showEquipments: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				modelNo: Joi.string().min(1).trim(),
				cTag: Joi.string().min(1).trim()
			}
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models/:modelId/equipments
	createEquipment: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().required(),
			metadata: Joi.array().items(Joi.object({
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required()
		}
	},

	// PUT /bsm/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models/:modelId/equipments
	updateEquipment: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().optional(),
			metadata: Joi.array().items(Joi.object({
				_id: Joi.objectId().required(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).optional(),
			model: Joi.objectId().optional(),
			paramSets: Joi.array().items(Joi.object({
				paramSet: Joi.objectId().required(),
				port: Joi.objectId().required()
			})).unique((a, b) => a.paramSet === b.paramSet).optional(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).optional()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/systems/:system/subSystems/:subSystem/types/:type/models/:modelId/equipments/:equipmentId/folders
	createEquipmentDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateEquipmentDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createEquipmentPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateEquipmentPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /bsm/certificates
	certificate: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				association: Joi.string().min(1).trim().required(),
				certificate: Joi.string().min(1).trim().required(),
				version: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				association: Joi.string().min(1).trim().required(),
				certificate: Joi.string().min(1).trim().required(),
				version: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				association: Joi.string().min(1).trim().required(),
				certificate: Joi.string().min(1).trim().required(),
				version: Joi.string().min(1).trim().required()
			}
		}
	},

	// POST /bsm/certificates/:certificateId/sections
	certificateSection: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				section: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				section: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				section: Joi.string().min(1).trim().required()
			}
		}
	},

	// POST /bsm/certificates/:certificateId/sections/:sectionId/subsections
	certificateSubsection: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				subsection: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				subsection: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				subsection: Joi.string().min(1).trim().required()
			}
		}
	},

	// GET /bsm/certificates
	showSubmission: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			lang: Joi.string().valid(['eng', 'zho_hk', 'zho_cn']).optional()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/certificate-associations/:certificateAssociation/certificates/:certificate/versions/:version/editions
	createEdition: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/certificate-associations/:certificateAssociation/certificates/:certificate/versions/:version/editions/:editionId/sections/:section/subsections/folders
	createSubmissionDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSubmissionDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createSubmissionPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'albums', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'photos', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSubmissionPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	// POST /bsm/system
	system: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				system: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				system: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				system: Joi.string().min(1).trim().required()
			},
			category: Joi.string().valid(['active', 'passive', 'renewable']).required()
		}
	},

	// POST /bsm/systems/:systemId/subsystems
	systemSubsystem: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				subsystem: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				subsystem: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				subsystem: Joi.string().min(1).trim().required()
			}
		}
	},

	// POST /bsm/systems/:systemId/subsystems/:subsystemId/types
	systemType: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			eng: {
				type: Joi.string().min(1).trim().required()
			},
			zho_hk: {
				type: Joi.string().min(1).trim().required()
			},
			zho_cn: {
				type: Joi.string().min(1).trim().required()
			}
		}
	},

	// GET /bsm/systems
	showSystem: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			lang: Joi.string().valid(['eng', 'zho_hk', 'zho_cn']).optional()
		}
	},

	showAllCustomTags: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			keyword: Joi.string().min(1).required(),
			limit: Joi.number().min(1).max(100).optional()
		}
	},

	updateMeterRecords: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			readings: Joi.array().items(Joi.object({
				from: Joi.date().required(),
				to: Joi.date().required(),
				value: Joi.number().required()
			})).required(),
			meterStructure: Joi.objectId().required()
		}
	},

	updateMeterModel: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().optional(),
			attributes: Joi.object().optional(),
			meterType: Joi.string().valid(staticInfo.meterTypeList()).optional(),
			templates: Joi.array().items(Joi.object({
				_id: Joi.objectId().optional(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).optional()
		}
	},

	// POST /bsm/sites/:site/buildings/:buildingId/meters
	createMeter: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().required(),
			isVirtual: Joi.boolean().required(),
			metadata: Joi.array().items(Joi.object({
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required()
		}
	},

	// PUT /bsm/sites/:site/buildings/:buildingId/meters/:meterId
	updateMeter: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().optional(),
			isVirtual: Joi.boolean().optional(),
			metadata: Joi.array().items(Joi.object({
				_id: Joi.objectId().required(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).optional(),
			model: Joi.objectId().optional(),
			paramSets: Joi.array().items(Joi.object({
				paramSet: Joi.objectId().required(),
				port: Joi.objectId().required()
			})).unique((a, b) => a.paramSet === b.paramSet).optional(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).optional()
		}
	},

	createMeterDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateMeterDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createMeterPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateMeterPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	updateSensorModel: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().optional(),
			attributes: Joi.object().optional(),
			sensorType: Joi.string().valid(staticInfo.sensorTypeList()).optional(),
			templates: Joi.array().items(Joi.object({
				_id: Joi.objectId().optional(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required()
			})).optional()
		}
	},

	createSensor: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().required(),
			metadata: Joi.array().items(Joi.object({
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required()
		}
	},

	updateSensor: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			modelNo: Joi.string().min(1).trim().optional(),
			metadata: Joi.array().items(Joi.object({
				_id: Joi.objectId().required(),
				field: Joi.string().min(1).trim().required(),
				dataType: Joi.string().min(1).trim().required(),
				choices: Joi.array().required(),
				values: Joi.array().required()
			})).optional(),
			model: Joi.objectId().optional(),
			paramSets: Joi.array().items(Joi.object({
				paramSet: Joi.objectId().required(),
				port: Joi.objectId().required()
			})).unique((a, b) => a.paramSet === b.paramSet).optional(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).optional()
		}
	},

	createSensorDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSensorDocument: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['documents', 'folders']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createSensorPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().when('type', { is: 'folders', then: Joi.required(), otherwise: Joi.optional() }),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			uploadedDocs: Joi.array().when('type', { is: 'documents', then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	updateSensorPhoto: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			type: Joi.string().valid(['photos', 'albums']).required(),
			name: Joi.string().min(1).trim().required(),
			cTags: Joi.array().items(Joi.string().min(1).trim()).required(),
			desc: Joi.string().trim().allow('').required(),
			rotation: Joi.number().optional(),
			location: Joi.object({
				asset: Joi.objectId().required(),
				destination: Joi.objectId().allow(null).required()
			}).optional(),
		}
	},

	createParameter: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			category: Joi.string().valid(staticInfo.parameterCategoryList).required(),
			unit: Joi.string().min(1).trim().required(),
			formula: Joi.array().items(Joi.string().min(1).trim(), Joi.objectId()).required()
		}
	},

	updateParameter: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			category: Joi.string().valid(staticInfo.parameterCategoryList).required(),
			unit: Joi.string().min(1).trim().required(),
			formula: Joi.array().items(Joi.string().min(1).trim(), Joi.objectId()).required()
		}
	},

	createParamSet: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			parameter: Joi.objectId().required(),
			contour: {
				min: Joi.number().required(),
				max: Joi.number().required(),
				radius: Joi.number().positive().required()
			}
		}
	},

	updateParamSet: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			parameter: Joi.objectId().required(),
			contour: {
				min: Joi.number().required(),
				max: Joi.number().required(),
				radius: Joi.number().positive().required()
			}
		}
	},

	showParamSets: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				parameter: Joi.objectId().optional(),
				floor: Joi.objectId().optional()
			}
		}
	},

	updateReadings: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			readings: Joi.array().items(Joi.object()).min(1).required()
		}
	},

	showReadings: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				date: {
					from: Joi.date().optional(),
					to: Joi.date().optional()
				},
				skip: Joi.number().min(0).optional(),
				ports: Joi.array().items(Joi.objectId()).optional()
			},
			isCount: Joi.boolean().optional()
		}
	},

	showFloorFeaturesSensorReading: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			isMean: Joi.boolean().required(),
			date: Joi.date().when('isMean', { is: false, then: Joi.required(), otherwise: Joi.optional() }),
			dateFrom: Joi.date().when('isMean', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
			dateTo: Joi.date().when('isMean', { is: true, then: Joi.required(), otherwise: Joi.optional() })
		}
	},

	createNegaport: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			agent: Joi.string().valid(staticInfo.negaportAgentList.map(agent => agent.name)).required(),
			sn: Joi.string().min(1).trim().optional(),
			desc: Joi.string().allow('').required(),
			timeOffset: Joi.number().min(-12).max(14).required()
		}
	},

	updateNegaport: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().min(1).trim().required(),
			agent: Joi.string().valid(staticInfo.negaportAgentList.map(agent => agent.name)).required(),
			sn: Joi.string().min(1).trim().optional(),
			desc: Joi.string().allow('').required(),
			timeOffset: Joi.number().min(-12).max(14).required()
		}
	},

	showNegaports: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				port: Joi.objectId().optional()
			}
		}
	},

	createPort: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			device: Joi.objectId().required(),
			name: Joi.string().trim().min(1).required(),
			agentSettings: Joi.object({
				device: Joi.string().min(1).trim().optional(),
				signal: Joi.string().min(1).trim().optional(),
			}).optional(),
		}
	},

	updatePort: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			device: Joi.objectId().optional(),
			name: Joi.string().trim().min(1).optional(),
			status: Joi.string().valid(['on', 'off']).optional(),
			agentSettings: Joi.object({
				device: Joi.string().min(1).trim().optional(),
				signal: Joi.string().min(1).trim().optional(),
			}).optional()
		}
	},

	showPorts: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			filter: {
				device: Joi.objectId().optional()
			}
		}
	},

	updateBills: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			bills: Joi.array().items(Joi.object({
				from: Joi.date().required(),
				to: Joi.date().required(),
				electricity: {
					conOnPeak: Joi.number().required(),
					conOffPeak: Joi.number().required(),
					conTotal: Joi.number().required(),
					demandChargeOnPeak: Joi.number().required(),
					demandChargeOffPeak: Joi.number().required(),
					fee: Joi.number().required()
				},
				gas: {
					conOnPeak: Joi.number().required(),
					conOffPeak: Joi.number().required(),
					conTotal: Joi.number().required(),
					fee: Joi.number().required()
				},
				water: {
					conTotal: Joi.number().required(),
					fee: Joi.number().required()
				},
				calFactor: Joi.number().required()
			})).required()
		}
	},

	showBillChart: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			type: Joi.string().valid(['weather']),
			bill: Joi.object({
				from: Joi.date(),
				to: Joi.date(),
				calFactor: Joi.boolean(),
				field: Joi.object({
					target: Joi.string().min(1).trim().required(),
					min: Joi.number().optional(),
					max: Joi.number().optional()
				}).required()
			}).required(),
			weather: Joi.object({
				field: Joi.object({
					target: Joi.string().min(1).trim().required(),
					min: Joi.number().optional(),
					max: Joi.number().optional()
				}).required()
			}).when('type', { is: 'weather', then: Joi.required(), otherwise: Joi.optional() }),
		}
	},

	deleteMultipleBills: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			_ids: Joi.array().items(Joi.objectId()).min(1).required()
		}
	},

	updateWeatherHistory: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			weathers: Joi.array().items(Joi.object({
				date: Joi.date().required(),
				airport: Joi.string().min(1).required(),
				temp: Joi.number().allow(null).required(),
				dewPt: Joi.number().allow(null).required(),
				humidity: Joi.number().allow(null).required(),
				pressure: Joi.number().allow(null).required(),
				windDir: Joi.string().allow(null).min(1).required(),
				windSpeed: Joi.number().allow(null).required(),
				condition: Joi.string().allow(null).min(1).required(),
				mContent: Joi.number().allow(null).required()
			})).required()
		}
	},

	breakDownWeatherHistory: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			from: Joi.date().required(),
			to: Joi.date().required(),
			airport: Joi.string().trim().min(1).required()
		}
	},

	showWeatherHistory: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			from: Joi.date().required(),
			to: Joi.date().required(),
			airport: Joi.string().trim().min(1).required()
		}
	},

	createStructure: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			name: Joi.string().trim().min(1).required()
		}
	},

	createStructureVersion: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			uploadedDocs: Joi.array().required(),
			svfPath: Joi.string().trim().min(1).required()
		}
	},

	sendMassEmails: {
		options: {
			allowUnknownParams: false,
		},
		body: {
			subject: Joi.string().trim().min(1).required(),
			receipant: {
				isAll: Joi.boolean().required(),
				groups: Joi.array().items(Joi.objectId()).required(),
				users: Joi.array().items(Joi.objectId()).required()
			},
			template: Joi.string().allow(['updateBSM'])
		}
	},

	allEquipments: {
		options: {
			allowUnknownParams: false,
		},
		query: {
			buildingId: Joi.objectId().required()
		}
	}

	// // UPDATE /api/users/:userId
	// updateUser: {
	// 	body: {
	// 		username: Joi.string().required(),
	// 		mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
	// 	},
	// 	params: {
	// 		userId: Joi.string().hex().required()
	// 	}
	// }
};
