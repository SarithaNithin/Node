const request = require('supertest');
var app = require('../server');


describe("Forget password Positive Test", () => {
  it('Forget password success', async () => {
    const res = await request(app)
      .post('/api/sc-forgotpassword')
      .send({
        email: 'nithin@gmail.com'
      });
    expect(res.status).toEqual(200);
  });
  it('Forget password success', async () => {
    const res = await request(app)
      .post('/api/sc-forgotpassword')
      .send({
        email: 'nithin@gmail.com'
      });
    expect(res.status).toEqual(200);
  });
  it('Forget password Failed, no such user', async () => {
    const res = await request(app)
      .post('/api/sc-forgotpassword')
      .send({
        email: 'nithin1@gmail.com'
      });
    expect(res.status).toEqual(404);
  });
});