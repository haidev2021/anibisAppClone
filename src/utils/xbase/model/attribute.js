
const { checkLanguageSupported } = require("../../utils");
const { getCategoriesByIds } = require("./category");
const sqlhelper = require("./sqlhelper");
const { fLog } = require('../../utils');
var db = null;
const cacheMap = { search: { de: new Map(), fr: new Map(), it: new Map() }, insert: { de: new Map(), fr: new Map(), it: new Map() } };

/*function reorderForInsertVsSearch
    - is Search: reorder 1, 208 & 207 to top
    - is Insert:  208 to top & 207 & 1 to bottom*/
function reorderForInsertVsSearch(atts, isSearch) {
    if (isSearch) {
        const newMinSortOrder = (atts.length > 0 ? atts[0].sortOrder : 0) - 3;
        const calcSortOrder = a => a.id === 1 ? newMinSortOrder : (a.id === 207 ? newMinSortOrder + 1 : (a.id === 208 ? newMinSortOrder + 2 : a.sortOrder));
        atts.sort((a, b) => (calcSortOrder(a) - calcSortOrder(b)));
    } else {
        const newMinSortOrder = (atts.length > 0 ? atts[0].sortOrder : 0) - 1;
        const newMaxSortOrder = (atts.length > 0 ? atts[atts.length - 1].sortOrder : 0) + 2;
        const calcSortOrder = a => a.id === 208 ? newMinSortOrder : (a.id === 207 ? newMaxSortOrder - 1 : (a.id === 1 ? newMaxSortOrder : a.sortOrder));
        atts.sort((a, b) => (calcSortOrder(a) - calcSortOrder(b)));
    }
}
function getCacheMapEntry(lng, isSearch) {
    return cacheMap[isSearch ? "search" : "insert"][lng];
}
module.exports = {
    getHandlers: ['attributesByCatId'],
    setDatabase: function (_db) {
        let TAG = "setDatabase";
        db = _db;
        fLog(TAG, 'attributesByCatId setDatabase db', db);
    },
    attributesByIds: function ({ ids, lng, isSearch }, callback) {

    }, 
    attributesByCatId: function ({ id, lng, isSearch }, callback) {
        let TAG = "attributesByCatId";
        lng = checkLanguageSupported(lng);
        // isSearch = isSearch === 'true';
        id = Number.parseInt(id);
        fLog(TAG, '{ id, lng, isSearch }', { id, lng, isSearch })
        if (getCacheMapEntry(lng, isSearch).has(id)) {
            fLog(TAG, `cacheMap[${[lng]}] has `, id)
            callback(getCacheMapEntry(lng, isSearch).get(id));
        } else {
            (new Promise(function (resolve, error) {
                let attQuery = sqlhelper.queries.getAttIdsByCat(id, isSearch)
                fLog(TAG, 'attQuery: ', attQuery);

                db.transaction((tx) => {
                    tx.executeSql(attQuery, [], (tx, result) => {
                        let atts = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            atts.push(result.rows.item(i));
                        }
                        reorderForInsertVsSearch(atts, isSearch);
                        fLog(TAG, `attQuery cacheMap[${[lng]}] set `, id)
                        getCacheMapEntry(lng, isSearch).set(id, atts);
                        fLog(TAG, `atts`, atts)
                        let [attMap, attWhereList] = sqlhelper.makeSQLWhereList(atts, "id");
                        resolve({ atts, attMap, attWhereList });
                    });
                });
            })).then(function ({ atts, attMap, attWhereList }) {
                let attDetailQuery = sqlhelper.queries.getAttDetail(lng, attWhereList);
                fLog(TAG, 'attributesByCatId attDetailQuery: ', attDetailQuery)
                return new Promise(function (resolve, error) {
                    db.transaction((tx) => {
                        tx.executeSql(attDetailQuery, [], (tx, result) => {
                            let attDetails = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                attDetails.push(result.rows.item(i));
                            }
                            attDetails.map(attDetail => {
                                let att = attMap.get(attDetail.attributeId);
                                let { attributeId, ...idRemoved } = attDetail;
                                Object.assign(att, idRemoved);
                            });
                            let [attNumericRangeMap, numericRangeWhereList] = sqlhelper.makeSQLWhereList(atts, "numericRange");
                            resolve({ atts, attMap, attWhereList, attNumericRangeMap, numericRangeWhereList });
                        })
                    });
                });
            }).then(function ({ atts, attMap, attWhereList, attNumericRangeMap, numericRangeWhereList }) {
                let attNumericRangeQuery = sqlhelper.queries.getNumericRange(numericRangeWhereList);
                fLog(TAG, 'attributesByCatId attNumericRangeQuery: ', attNumericRangeQuery)
                return new Promise(function (resolve, error) {
                    db.transaction((tx) => {
                        tx.executeSql(attNumericRangeQuery, [], (tx, result) => {
                            let attNumericRanges = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                attNumericRanges.push(result.rows.item(i));
                            }
                            attNumericRanges.map(attNumericRange => {
                                let att = attNumericRangeMap.get(attNumericRange.numericRangeId);
                                att.numericRange = attNumericRange;
                            });
                            resolve({ atts, attMap, attWhereList });
                        });
                    });
                });
            }).then(function ({ atts, attMap, attWhereList }) {
                let entriesQuery = sqlhelper.queries.getAttEntries(lng, attWhereList)
                fLog(TAG, 'attributesByCatId entriesQuery: ', entriesQuery)
                db.transaction((tx) => {
                    tx.executeSql(entriesQuery, [], (tx, result) => {
                        let entries = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            entries.push(result.rows.item(i));
                        }
                        entries.map(entry => {
                            let att = attMap.get(entry.attributeId);
                            if (!att.entries)
                                att.entries = [];
                            att.entries.push(entry);
                        });
                        fLog(TAG, 'attributesByCatId atts: ', atts)
                        callback(atts);
                    });
                });
            });
        }
    },
}