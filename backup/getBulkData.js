
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

const dataProcess = require('../src/dataProcess');
var {Sequelize,DataTypes} = require('sequelize');
const connection_test = new Sequelize("nodejs-api-test", "root", "Wofnithin@2015", {
    host: "localhost",
    dialect: 'mysql'
});
const usertab = connection_test.define("users", {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    fullname: Sequelize.STRING,
    dob: Sequelize.DATE,
    isAdmin: Sequelize.BOOLEAN
});

const countrytab = connection_test.define("country", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    },
    dial_code: {
        type: Sequelize.STRING
    }
});

const statetab = connection_test.define("state", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
});

const citytab = connection_test.define("city", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});
connection_test.sync();


statetab.belongsTo(countrytab);
citytab.belongsTo(statetab);
usertab.belongsTo(citytab);


let States = State.getAllStates();
for (var key in States) {
    let value = {
        name: States[key].name,
        code: States[key].isoCode
    };
    if(States[key].name == 'Kerala')
    (async () => {
        await dataProcess.find(statetab, value).then((reponse) => {
            let Cities = City.getCitiesOfState('IN', 'KL');
            for (var key1 in Cities) {
                let value1 = {
                    name: Cities[key1].name,
                    stateCode: Cities[key1].stateCode,
                    stateId: reponse.id
                };
                (async () => {
                    await dataProcess.insert(citytab, value1);
                })();
            }
        });
    })();
}
//sql.User.belongsTo(sql.Cities,  {as: 'city_name'});
/*


let States = State.getAllStates();
for (var key in States) {
    let value = {
        name: States[key].name,
        code: States[key].isoCode,
        countryCode: States[key].countryCode
    };
    if(States[key].name == 'Kerala')
    (async () => {
        await dataProcess.find(sql.States, value).then((reponse) => {
            let Cities = City.getCitiesOfState('IN', 'KL');
            for (var key1 in Cities) {
                let value1 = {
                    name: Cities[key1].name,
                    stateCode: Cities[key1].stateCode,
                    stateId: reponse.id
                };
                (async () => {
                    await dataProcess.insert(sql.Cities, value1);
                })();
            }
        });
    })();
}
let Cities = City.getAllCities();
for (var key in Cities) {
    let value = {
        name: Cities[key].name,
        stateCode: Cities[key].stateCode,
        countryCode: Cities[key].countryCode
    };
    console.log(value);
    (async () => {
        await dataProcess.insert(sql.Cities, value);
    })();
}

let States = State.getStatesOfCountry('IN')
for (var key in States) {
    let value = {
        name: States[key].name,
        code: States[key].isoCode,
        countryId: 101
    };
   // console.log(value);
    (async () => {
        await dataProcess.insert(statetab, value);
    })();
}

let countries = Country.getAllCountries();
for (var key in countries) {
    let value = {
        name: countries[key].name,
        code: countries[key].isoCode,
        dial_code: countries[key].phonecode
    };
    console.log(value);
    (async () => {
        await dataProcess.insert(countrytab, value);
    })();
}
let countries = data.getCountries();
//console.log(countries);

for(var key in countries) {
    let states = data.getStates(countries[key].code);
    for(var key1 in states) {
        let value = {name:states[key1],code:countries[key].code};
        console.log(value);
        (async () => {
            await dataProcess.insert(sql.States, value)
        })();
    }
}
 */