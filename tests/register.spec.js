const request = require('supertest');
const app = require('../server');

describe("Register", () => {
    test('Register success', async () => {
        const res = await request(app)
            .post('/api/sc-register')
            .send({
                name: "newtestuser17",
                password: "encnewtestuser17",
                fullname: "newtestuser",
                dob: "1990-07-30",
                email: "newtestuser17@gmail.com",
                role: "admin",
                cityId: "28"
            });
        expect(res.statusCode).toEqual(201);
    });    
    it('Registraion failed to insert data in db,duo to wrong date format', async () => {
        const res = await request(app)
            .post('/api/sc-register')
            .send({
                name: "newtestuser",
                password: "encnewtestuser",
                fullname: "newtestuser",
                dob: "1990/07/30",
                email: "newtestuser@gmail.com",
                role: "admin",
                cityId: "28"
            });
        expect(res.status).toEqual(406);
    });
    it('User with this email id already exist', async () => {
        const res = await request(app)
            .post('/api/sc-register')
            .send({
                name: "newtestuser",
                password: "encnewtestuser",
                fullname: "newtestuser",
                dob: "1990-07-30",
                email: "newtestuser@gmail.com",
                role: "admin",
                cityId: "28"
            });
        expect(res.status).toEqual(406);
    });
});