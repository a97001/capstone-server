const bcrypt = require('bcrypt');
const config = require('../../config/env');
const pathToRegexp = require('path-to-regexp');

module.exports = {
  /**
   * check if floor belongs to building
   */
  checkFloorBelongsToBuilding(floor, building) {
    for (let i = 0; i < building.floors.length; i++) {
      if (floor._id.toString() === building.floors[i].toString()) {
        return true;
      }
    }
    return false;
  },

  /**
   * check if feature belongs to floor
   */
  checkFeatureBelongsToFloor(feature, floor) {
    for (let i = 0; i < floor.features.length; i++) {
      if (feature._id.toString() === floor.features[i].toString()) {
        return true;
      }
    }
    return false;
  },

  /**
   * Search group
   */
  searchGroup(groups, groupId) {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i]._id.toString() === groupId.toString()) {
        return groups[i];
      }
    }
    return null;
  },

  /**
   * hash password
   */
  hashPassword(plainText, callback) {
    bcrypt.hash(plainText, 10, (err, hash) => {
      callback(hash);
    });
  },

  /**
   * Compare hashed password
   */
  compareHashedPassword(plainText, hash, callback) {
    bcrypt.compare(plainText, hash, (err, result) => {
      callback(result);
    });
  },

  /**
   * Validate permission
   */
  validatePermission(permission, permissionList) {
    for (let i = 0; i < permissionList.length; i++) {
      if (permission.methods.indexOf('*') > -1 || permission.methods.indexOf(permissionList[i].type) > -1) {
        const regex = pathToRegexp(permissionList[i].url, [], { end: true });
        if (regex.test(permission.url)) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Is url match
   */
  isPathMatchRegex(regexUrl, url) {
    if (regexUrl.method === url.method) {
      console.log('x');
    }
    return false;
  },

  /**
   * Get match url
   */
  getMatchUrl(app, url) {
    const routerStack = app._router.stack;
    for (let i = 0; i < routerStack.length; i++) {
      if (routerStack[i].hasOwnProperty('route') && routerStack[i].route.hasOwnProperty('path')) {
        console.log('x');
      }
    }
    return false;
  }

  /**
   * check if internal admin
   */
  // requiresInternalAdmin(req, res, next) {
  //   co(function* () {
  //     const me = yield User.findOne({ _id: req.me._id }).lean().exec();
  //     if (me.roles.indexOf('internalAdmin') < 0) {
  //       return res.status(403).end();
  //     }
  //     return next();
  //   }).catch((err) => {
  //     next(err);
  //   });
  // }
};
