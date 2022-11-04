const constants = require('./constants');

async function insert(tablename, keys, values) {
    try {
        let sql = 'INSERT INTO ' + tablename +' '+keys+ ' VALUES ' + values;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('value inserted');
                return result;
            }

        });
    } finally {
        await constants.client.close();
    }
}