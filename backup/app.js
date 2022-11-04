const constants = require('../src/constants/constants');
const userRegistration = require('../src/models/userRegistration');
const login = require('../src/models/login');
const forgotPassword = require('../src/models/forgotPassword');

console.log(process.env.PORT);


constants.app.post('/sc-register', (req, res) => {
  userRegistration.userRegistrationRequest(req, res);
});
constants.app.post('/sc-login', (req, res) => {
  const loginData = req.body;
  login.loginRequest(loginData, res);
});
constants.app.post('/sc-forgotpassword', (req, res) => {
  forgotPassword.forgotPasswordRequest(req, res);
});
constants.app.get('/sc-verify', (req, res) => {
  res.send("successfully verified!");
});
constants.app.get('/', (req, res) => {
  res.json("get request");
});

constants.app.listen(constants.port, () => console.log(`site checker app listening on port ${constants.port}!`));