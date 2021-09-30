
const { checkLanguageSupported, fLog } = require("../../utils");
const sqlhelper = require("./sqlhelper");
var db = null;
const subCatMap = { de: new Map(), fr: new Map(), it: new Map() };
const categoryMap = { de: new Map(), fr: new Map(), it: new Map() };
const SPECIAL_CATS = null;//[16, 2, 4, 6, 14, 15];//[6];//
// const {xbasedb, textdb} = require('../xbase');
function isForceSpecialCats() {
    return SPECIAL_CATS && SPECIAL_CATS.length > 0;
}
function getCategoryByIdAsParentIdRecursive(lng, id, resultArray, callback) {
    let TAG = "getCategoryByIdAsParentIdRecursive";
    lng = checkLanguageSupported(lng);
    let found = null;
    if (!id) {
        fLog(TAG, 'resultArray', resultArray)
        if (callback)
            callback(resultArray);
    } else {
        if (categoryMap[lng].has(id)) {
            fLog(TAG, `categoryMap[${lng}] has `, id)
            found = categoryMap[lng].get(id);
            resultArray.unshift(found);
            getCategoryByIdAsParentIdRecursive(lng, found.parentId, resultArray, callback);
        } else {
            let query = sqlhelper.queries.getCategory(id, lng);
            fLog(TAG, 'query', query)
            if (db)
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, result) => {
                        fLog(TAG, 'result', result)
                        let rows = result.rows;
                        // db.all(query, function (err, rows) {
                        if (rows) {
                            fLog(TAG, 'rows', rows)
                            if (rows && rows.length == 1) {
                                found = rows.item(0);
                                fLog(TAG, 'found', found)
                                categoryMap[lng].set(id, found);
                                resultArray.unshift(found);
                                getCategoryByIdAsParentIdRecursive(lng, found.parentId, resultArray, callback);
                            } else
                                getCategoryByIdAsParentIdRecursive(lng, null, resultArray, callback);
                        } else {
                            callback(err);
                        }
                    })
                });
        }
    }
}

module.exports = {
    getHandlers: ['getSubCategories', 'getCategoriesByIds', 'getCategoryPathById'],
    setDatabase: function (_db) {
        console.log("setDatabase = " + _db);
        db = _db;;
    },
    getSubCategories: function ({ id, lng }, callback) {
        let TAG = "getSubCategories";
        fLog(TAG, { id, lng })
        lng = checkLanguageSupported(lng);
        if (!isForceSpecialCats() && subCatMap[lng].has(id)) {
            fLog(TAG, `subCatMap[${lng}] has `, id)
            callback({ subCategories: subCatMap[lng].get(id) });
        } else {
            let query = sqlhelper.queries.getSubCategories(id, lng);
            fLog(TAG, 'query', query)
            if (db != null)
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, results) => {
                        console.log("executeSql Query completed");
                        var len = results.rows.length;
                        let result = [];
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            result.push(row);
                        }
                        // console.log(`Category name:`, result);
                        callback(result);
                    });
                });
        }
    },
    getCategoriesByIds: function ({ ids, lng }, callback) {
        let TAG = "getCategoriesByIds";
        lng = checkLanguageSupported(lng);
        let query = sqlhelper.queries.getCategoriesByIds(ids, lng);
        fLog(TAG, 'query', query)
        db.all(query, function (err, rows) {
            if (!err) {
                fLog(TAG, 'rows ', rows);
                callback(rows);
            } else {
                callback(err);
            }
        });
    },
    getCategoryPathById: function ({ id, lng }, callback) {
        let TAG = "getCategoryPathById";
        let resultArray = [];
        getCategoryByIdAsParentIdRecursive(lng, id, resultArray, callback);
    },
    getCategoryIdPath: function (childId, callback) {
        let TAG = "getCategoryIdPath";
        if (!childId)
            callback([]);
        else {
            let resultArray = [];
            getCategoryByIdAsParentIdRecursive("de", childId, resultArray, callback);
        }
    },
}