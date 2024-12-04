let sqlite3 = require('sqlite3').verbose()

class DB{
    constructor(){}
    getData(table_name){
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READONLY, (err) => {
                db.serialize(() => {
                    db.all(`SELECT * FROM ${table_name}`, (err, data) => {
                        if (err) {
                            reject("bad")
                        }else{
                            resolve(data)
                        }
                    })
                })
                db.close()
            })
        })
    }
}
module.exports = DB