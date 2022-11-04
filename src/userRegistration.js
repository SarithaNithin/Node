const lib = require('./config/config');
const saltRounds = 8;

const dataProcess = require('./dataProcess');
const sql = require("../database/models");

async function dataValidator(data) {
    var registerSubmitData = {};
    var countOfDataIndex = 0;
    try {
        for (var key in data) {
            switch (key) {
                case 'password':
                    registerSubmitData['password'] = await lib.bcrypt.hash(data[key], saltRounds);
                    countOfDataIndex++;
                    break;
                case 'dob':
                    if (!lib.validator.isDate(data[key])) {
                        console.log('Date is invalid');
                    } else {
                        registerSubmitData['dob'] = data[key];
                        countOfDataIndex++;
                    }
                    break;
                case 'email':
                    if (!lib.validator.isEmail(data[key])) {
                        console.log('Email is invalid');
                    } else {
                        registerSubmitData['email'] = data[key];
                        countOfDataIndex++;
                    }
                    break;
                default:
                    if (countOfDataIndex == 7) {
                        return registerSubmitData;
                    } else {
                        if (registerSubmitData[key] == undefined) {
                            registerSubmitData[key] = data[key];
                            countOfDataIndex++;
                        }
                    }
                    break;
            }
        }
    } finally {
        return registerSubmitData;
    }
}
async function userRegistrationRequest(registerSubmitData, res) {
    if (registerSubmitData != undefined) {
        var query = { 'name': registerSubmitData.name, 'email': registerSubmitData.email };
        if (registerSubmitData.role == 'user') {
            query.isAdmin = 0
        } else {
            query.isAdmin = 1
        }
        let result = await dataProcess.find(sql.User, query);
        (async () => {
            var signupData = await dataValidator(registerSubmitData);
            console.log(signupData);
            checkAndHandleRegistration(result, res, signupData);
        })();
    }
}
async function checkAndHandleRegistration(result, res, registerSubmitData) {
    if (result === 'null' || result === null || result === undefined) {
        if (registerSubmitData.role == 'user') {
            registerSubmitData.isAdmin = 0
        } else {
            registerSubmitData.isAdmin = 1
        }
        try {
            (async () => {
                await dataProcess.insert(sql.User, registerSubmitData);
            })().then(() => {
                res.statusCode = 201;
                res.send('created');
            });
        } catch (err) {
            console.log(err);
            res.statusCode = 406;
            res.send('Unable to insert');
        }
    } else {
        res.statusCode = 406;
        res.send('You Already have an account');
    }
}

module.exports = {
    userRegistrationRequest
};