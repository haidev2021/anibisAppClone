const category = require('./model/category');
const attribute = require('./model/attribute');
import SQLite from 'react-native-sqlite-storage';
const country = require('./model/country');
const location = require('./model/location');
const textResource = require('./model/textResource');

SQLite.enablePromise(true);

function errorCB(err) {
  console.log("SQL Error: " + err);
};

function successCB() {
  console.log("SQL executed fine");
};

const xbaseDbModels = [category, attribute, country];
const textDbModels = [textResource];

function initModels(models, db) {
  models.map(model => {
    model.setDatabase(db);
  })
};

module.exports = {
  initDatabases: function () {
    console.log("@@@@@@ xxxxxxxxxxxxx initDatabases xxxxxxxxxxxxx")
    SQLite.openDatabase({ name: 'xbase.sqlite', location: 'default', createFromLocation: 1}).then(db => {
      console.log("openDatabase xbase", db)
      initModels(xbaseDbModels, db);
    }).catch(error => console.log("openDatabase xbase error", error));
  
    SQLite.openDatabase({ name: 'textresources.sqlite', location: 'default', createFromLocation: 1}).then(db => {
      console.log("openDatabase textresource", db)
      initModels(textDbModels, db);
    }).catch(error => console.log("openDatabase textresources error", error));
  },
};