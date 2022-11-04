
async function insert(collection, data) {
    const resp = await collection.create(data).then(function (item) {
        // console.log(item)
    }).catch((err) => {
        console.log('err from insert to db');
        console.log(err);
    });
}
async function find(collection, query) {
    console.log(query);
    const resp = await collection.findOne({
        where: query
    }).then((response) => {
        if (response) {
            return response.dataValues;
        }
    }).catch((err) => {
        console.log('err from find from db');
        console.log(err);
    });
    return resp;
}
async function findAll(collection, query) {
    console.log(query);
    const resp = await collection.findAll({
        where: query
    }).then((response) => {
        console.log(response)
        if (response) {
            return response;
        }
    }).catch((err) => {
        console.log('err from find from db');
        console.log(err);
    });
    return resp;
}

module.exports = {
    insert,
    find,
    findAll
};