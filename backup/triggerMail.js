const API_KEY = '412c07b8789144514df9007a949b1201-7b8c9ba8-49ad32cc';
const DOMAIN = 'sandboxbd586591f6264447b586b28a7840bc66.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mgClient = mailgun.client({username: 'api', key: API_KEY});

const messageData = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'saritha.ks@trivand.com',
  subject: 'Hello',
  text: 'verify your account by click this',
  html: '<html><a href="https://localhost:5000/sc-verify">https://localhost:5000/sc-verify</a></html>'
};

mgClient.messages.create(DOMAIN, messageData)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.error(err);
 });