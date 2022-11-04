
const dataProcess = require('../src/db/dataProcess');
const sql = require("../src/sequelize");

let data = {
    country: "India",
    states:{
        "0":"kerala",
        "1":"tamil nadu"
    },
    city: {
        "0":"idukki",
        "1":"kannur"
    }
};
insertDataInCountry(sql.Location,data)
async function insertDataInCountry(collection,data){
    await dataProcess.insert(collection, data);
}