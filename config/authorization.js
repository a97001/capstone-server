const mongoose = require('mongoose');
const _ = require('lodash');

/**
 * Check whether user is userAdmin
 */
exports.requiresUserAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.me.isAdminUser) {
    return res.status(403).json({ err: 'User is not authorized' });
  }
  return next();
};

//----------------------------------------

/**
 * Check Building HVAC Read 1
 */
exports.checkBuildingHVACRead = (isAdminUser, permissions, buildingId) => {
  const code = 1;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building HVAC Create 2
 */
exports.checkBuildingHVACCreate = (isAdminUser, permissions, buildingId) => {
  const code = 2;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building HVAC Update 3
 */
exports.checkBuildingHVACUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 3;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building HVAC Delete 4
 */
exports.checkBuildingHVACDelete = (isAdminUser, permissions, buildingId) => {
  const code = 4;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building FS Read 5
 */
exports.checkBuildingFSRead = (isAdminUser, permissions, buildingId) => {
  const code = 5;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building FS Create 6
 */
exports.checkBuildingFSCreate = (isAdminUser, permissions, buildingId) => {
  const code = 6;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building FS Update 7
 */
exports.checkBuildingFSUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 7;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building FS Delete 8
 */
exports.checkBuildingFSDelete = (isAdminUser, permissions, buildingId) => {
  const code = 8;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building P&D Read 9
 */
exports.checkBuildingPAndDRead = (isAdminUser, permissions, buildingId) => {
  const code = 9;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building P&D Create 10
 */
exports.checkBuildingPAndDCreate = (isAdminUser, permissions, buildingId) => {
  const code = 10;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building P&D Update 11
 */
exports.checkBuildingPAndDUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 11;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building P&D Delete 12
 */
exports.checkBuildingPAndDDelete = (isAdminUser, permissions, buildingId) => {
  const code = 12;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lift&Escalator Read 13
 */
exports.checkBuildingLiftAndEscalatorRead = (isAdminUser, permissions, buildingId) => {
  const code = 13;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lift&Escalator Create 14
 */
exports.checkBuildingLiftAndEscalatorCreate = (isAdminUser, permissions, buildingId) => {
  const code = 14;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lift&Escalator Update 15
 */
exports.checkBuildingLiftAndEscalatorUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 15;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lift&Escalator Delete 16
 */
exports.checkBuildingLiftAndEscalatorDelete = (isAdminUser, permissions, buildingId) => {
  const code = 16;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Electrical Read 17
 */
exports.checkBuildingElectricalRead = (isAdminUser, permissions, buildingId) => {
  const code = 17;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Electrical Create 18
 */
exports.checkBuildingElectricalCreate = (isAdminUser, permissions, buildingId) => {
  const code = 18;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Electrical Update 19
 */
exports.checkBuildingElectricalUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 19;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Electrical Delete 20
 */
exports.checkBuildingElectricalDelete = (isAdminUser, permissions, buildingId) => {
  const code = 20;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building BMS Read 21
 */
exports.checkBuildingBMSRead = (isAdminUser, permissions, buildingId) => {
  const code = 21;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building BMS Create 22
 */
exports.checkBuildingBMSCreate = (isAdminUser, permissions, buildingId) => {
  const code = 22;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building BMS Update 23
 */
exports.checkBuildingBMSUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 23;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building BMS Delete 24
 */
exports.checkBuildingBMSDelete = (isAdminUser, permissions, buildingId) => {
  const code = 24;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building ELV Read 25
 */
exports.checkBuildingELVRead = (isAdminUser, permissions, buildingId) => {
  const code = 25;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building ELV Create 26
 */
exports.checkBuildingELVCreate = (isAdminUser, permissions, buildingId) => {
  const code = 26;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building ELV Update 27
 */
exports.checkBuildingBMSUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 27;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building ELV Delete 28
 */
exports.checkBuildingELVDelete = (isAdminUser, permissions, buildingId) => {
  const code = 28;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lighting Read 29
 */
exports.checkBuildingLightingRead = (isAdminUser, permissions, buildingId) => {
  const code = 29;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lighting Create 30
 */
exports.checkBuildingLightingCreate = (isAdminUser, permissions, buildingId) => {
  const code = 30;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lighting Update 31
 */
exports.checkBuildingLightingUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 31;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Lighting Delete 32
 */
exports.checkBuildingLightingDelete = (isAdminUser, permissions, buildingId) => {
  const code = 32;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building General Read 33
 */
exports.checkBuildingGeneralRead = (isAdminUser, permissions, buildingId) => {
  const code = 33;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building General Create 34
 */
exports.checkBuildingGeneralCreate = (isAdminUser, permissions, buildingId) => {
  const code = 34;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building General Update 35
 */
exports.checkBuildingGeneralUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 35;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building General Delete 36
 */
exports.checkBuildingGeneralDelete = (isAdminUser, permissions, buildingId) => {
  const code = 37;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Sun Read 37
 */
exports.checkBuildingPassiveSunRead = (isAdminUser, permissions, buildingId) => {
  const code = 37;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Sun Create 38
 */
exports.checkBuildingPassiveSunCreate = (isAdminUser, permissions, buildingId) => {
  const code = 38;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Sun Update 39
 */
exports.checkBuildingPassiveSunUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 39;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Sun Delete 40
 */
exports.checkBuildingPassiveSunDelete = (isAdminUser, permissions, buildingId) => {
  const code = 40;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Light Read 41
 */
exports.checkBuildingPassiveLightRead = (isAdminUser, permissions, buildingId) => {
  const code = 41;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Light Create 42
 */
exports.checkBuildingPassiveLightCreate = (isAdminUser, permissions, buildingId) => {
  const code = 42;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Light Update 43
 */
exports.checkBuildingPassiveLightUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 43;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Light Delete 44
 */
exports.checkBuildingPassiveLightDelete = (isAdminUser, permissions, buildingId) => {
  const code = 44;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Wind Read 45
 */
exports.checkBuildingPassiveWindRead = (isAdminUser, permissions, buildingId) => {
  const code = 45;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Wind Create 46
 */
exports.checkBuildingPassiveWindCreate = (isAdminUser, permissions, buildingId) => {
  const code = 46;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Wind Update 47
 */
exports.checkBuildingPassiveWindUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 47;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Wind Delete 48
 */
exports.checkBuildingPassiveWindDelete = (isAdminUser, permissions, buildingId) => {
  const code = 48;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Others Read 49
 */
exports.checkBuildingPassiveOthersRead = (isAdminUser, permissions, buildingId) => {
  const code = 49;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Others Create 50
 */
exports.checkBuildingPassiveOthersCreate = (isAdminUser, permissions, buildingId) => {
  const code = 50;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Others Update 51
 */
exports.checkBuildingPassiveOthersUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 51;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Passive-Others Delete 52
 */
exports.checkBuildingPassiveOthersDelete = (isAdminUser, permissions, buildingId) => {
  const code = 52;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Solar Read 53
 */
exports.checkBuildingRenewableSolarRead = (isAdminUser, permissions, buildingId) => {
  const code = 53;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Solar Create 54
 */
exports.checkBuildingRenewableSolarCreate = (isAdminUser, permissions, buildingId) => {
  const code = 54;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Solar Update 55
 */
exports.checkBuildingRenewableSolarUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 55;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Solar Delete 56
 */
exports.checkBuildingRenewableSolarDelete = (isAdminUser, permissions, buildingId) => {
  const code = 56;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Biomass Read 57
 */
exports.checkBuildingRenewableBiomassRead = (isAdminUser, permissions, buildingId) => {
  const code = 57;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Biomass Create 58
 */
exports.checkBuildingRenewableBiomassCreate = (isAdminUser, permissions, buildingId) => {
  const code = 58;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Biomass Update 59
 */
exports.checkBuildingRenewableBiomassUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 59;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Biomass Delete 60
 */
exports.checkBuildingRenewableBiomassDelete = (isAdminUser, permissions, buildingId) => {
  const code = 60;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Wind Read 61
 */
exports.checkBuildingRenewableWindRead = (isAdminUser, permissions, buildingId) => {
  const code = 61;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Wind Create 62
 */
exports.checkBuildingRenewableWindCreate = (isAdminUser, permissions, buildingId) => {
  const code = 62;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Wind Update 63
 */
exports.checkBuildingRenewableWindUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 63;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Wind Delete 64
 */
exports.checkBuildingRenewableWindDelete = (isAdminUser, permissions, buildingId) => {
  const code = 64;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Geothermal Read 65
 */
exports.checkBuildingRenewableGeothermalRead = (isAdminUser, permissions, buildingId) => {
  const code = 65;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Geothermal Create 66
 */
exports.checkBuildingRenewableGeothermalCreate = (isAdminUser, permissions, buildingId) => {
  const code = 66;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Geothermal Update 67
 */
exports.checkBuildingRenewableGeothermalUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 67;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Geothermal Delete 68
 */
exports.checkBuildingRenewableGeothermalDelete = (isAdminUser, permissions, buildingId) => {
  const code = 68;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Hydropower Read 69
 */
exports.checkBuildingRenewableHydropowerRead = (isAdminUser, permissions, buildingId) => {
  const code = 69;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Hydropower Create 70
 */
exports.checkBuildingRenewableHydropowerCreate = (isAdminUser, permissions, buildingId) => {
  const code = 70;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Hydropower Update 71
 */
exports.checkBuildingRenewableHydropowerUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 71;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Hydropower Delete 72
 */
exports.checkBuildingRenewableHydropowerDelete = (isAdminUser, permissions, buildingId) => {
  const code = 72;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Others Read 73
 */
exports.checkBuildingRenewableOthersRead = (isAdminUser, permissions, buildingId) => {
  const code = 73;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Others Create 74
 */
exports.checkBuildingRenewableOthersCreate = (isAdminUser, permissions, buildingId) => {
  const code = 74;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Others Update 75
 */
exports.checkBuildingRenewableOthersUpdate = (isAdminUser, permissions, buildingId) => {
  const code = 75;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Renewable-Others Delete 76
 */
exports.checkBuildingRenewableOthersDelete = (isAdminUser, permissions, buildingId) => {
  const code = 76;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Submission-ISO 50001 Read 77
 */
exports.checkBuildingSubmissionISO50001Read = (isAdminUser, permissions, buildingId) => {
  const code = 77;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Submission-ISO 50001 Create 78
 */
exports.checkBuildingSubmissionISO50001Create = (isAdminUser, permissions, buildingId) => {
  const code = 78;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Submission-ISO 50001 Update 79
 */
exports.checkBuildingSubmissionISO50001Update = (isAdminUser, permissions, buildingId) => {
  const code = 79;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};

/**
 * Check Building Submission-ISO 50001 Delete 80
 */
exports.checkBuildingSubmissionISO50001Delete = (isAdminUser, permissions, buildingId) => {
  const code = 80;
  const length = permissions.length;
  let isFound = false;
  let splitedPermission = [];
  if (!isAdminUser) {
    for (let i = 0; i < length; i++) {
      splitedPermission = permissions[i].split('@');
      if (Number(splitedPermission[0]) === code && splitedPermission[1] === buildingId) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return true;
};
