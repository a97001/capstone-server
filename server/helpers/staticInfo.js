const allPaths = require('../../public/api_data.json');
const config = require('../../config/env');
const path = require('path');

module.exports = {
  /**
   * Language list
   */
  languageList() {
    return [
      { code: 'eng', name: 'English' },
      { code: 'zho_hk', name: '繁體中文' },
      { code: 'zho_cn', name: '簡体中文' }
    ];
  },

  /**
   * Permission list
   */
  permissionList(dir) {
    dir = dir.split(path.sep);
    const version = dir[dir.length - 1].replace('v', '');
    const permissions = [];
    for (let i = 0; i < allPaths.length; i++) {
      if (allPaths[i].version !== version) {
        continue;
      }
      if (allPaths[i].title.charAt(0) === '*') {
        continue;
      }
      if (['Systems', 'Tags', 'Users', 'Utility', 'Uploads'].indexOf(allPaths[i].group) > -1) {
        continue;
      }
      permissions.push({ type: allPaths[i].type, url: allPaths[i].url, title: allPaths[i].title, group: allPaths[i].group });
    }
    return permissions;
  },

  defaultFeatureTypeList() {
    return ['unclassified', 'equipment', 'meter', 'sensor', 'location'];
  },

  sensorTypeList() {
    return ['IEQ Sensor'];
  },

  meterTypeList() {
    return ['Power Meter', 'Water Meter'];
  },

  parameterCategoryList: ['Ambient', 'Energy'],

  negaportAgentList: [
    { name: 'Virtual', extraFields: {} },
    { name: 'Enerwise EM100', extraFields: { deviceSetting: 'Array', signalSetting: 'Array' } }
  ],

  deviceList: ['equipment', 'sensor', 'meter']
};
