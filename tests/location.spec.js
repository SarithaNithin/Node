const request = require('supertest');
var app = require('../server');


describe("Login Positive Test", () => {
  it('Login success', async () => {
    const res = await request(app)
      .post('/api/sc-login/')
      .send({
        email: 'nithin@gmail.com',
        password: 'encnithin'
      });
    expect(res.status).toEqual(200);
  });
});
describe('Login Negative Test, with wrong password', () => {
  test('Login Password Is Wrong', async () => {
    const res = await request(app)
      .post('/api/sc-login')
      .send({
        email: 'nithin@gmail.com',
        password: 'encnithin1'
      });
    expect(res.status).toEqual(401);
  });
});
describe('Login Negative Test, with wrong email', () => {
  it('Login with wrong user name and password', async () => {
    const res = await request(app)
      .post('/api/sc-login')
      .send({
        email: 'abc@gmail.com',
        password: 'abcdefgthklkuy'
      });
    expect(res.status).toEqual(206);
  });
});