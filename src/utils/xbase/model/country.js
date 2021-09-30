const { fLog, checkLanguageSupported } = require("../../utils");
const sqlhelper = require("./sqlhelper");
var db = null;
const cache = { de: null, fr: null, it: null };
module.exports = {
    getHandlers: ['countries'],
    setDatabase: function (_db) {
        let TAG = "setDatabase";
        db = _db;
        fLog(TAG, 'db', db);
    },
    getXBaseCountries: function ({ lng }, callback) {
        let TAG = "countries";
        lng = checkLanguageSupported(lng);
        if (cache[lng]) {
            callback({ countries: cache[lng] });
        } else {
            let query = sqlhelper.queries.getCountries(lng);
            fLog(TAG, 'query', query)
            if (db)
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, result) => {
                        fLog(TAG, 'result', result)
                        let rows = result.rows;
                        if (rows) {
                            var len = result.rows.length;
                            let resultArray = [];
                            for (let i = 0; i < len; i++) {
                                let row = result.rows.item(i);
                                resultArray.push(row);
                            }
                            fLog(TAG, 'resultArray', resultArray)
                            callback(resultArray);
                        } else {
                            callback(null);
                        }
                    });
                })
        }
    }
}