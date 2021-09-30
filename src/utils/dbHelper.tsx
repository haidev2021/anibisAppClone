import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import { IXBaseCategory } from './xbaseInterface.d';

function errorCB(err: any) {
    console.log("SQL Error: " + err);
};

function successCB() {
    console.log("SQL executed fine");
};

var db = SQLite.openDatabase({ name: 'xbase.sqlite', location: 'default', createFromLocation: 1, }, successCB, errorCB);
// SQLite.enablePromise(true);
type IGetXBCategoriesCallback = (cats: IXBaseCategory[]) => void
function getXBCategoriesByParentId(parentId: number, callback: IGetXBCategoriesCallback) {
    console.log("Database transaction db = " + db);
    if (db)
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM XBCategories', [], (tx, results) => {
                console.log("executeSql Query completed");
                var len = results.rows.length;
                let allCategories = "";
                let result: IXBaseCategory[] = [];
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    allCategories += ` ${row.nameDe}`;
                    result.push(row);
                }
                // console.log(`Category name: ${allCategories}`);
                callback(result);
            });
        });
}
export default db