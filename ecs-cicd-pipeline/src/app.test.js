const request = require('supertest');
const app = require('./app');

describe('API endpoints', () => {
  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /properties returns property list', async () => {
    const res = await request(app).get('/properties');
    expect(res.statusCode).toBe(200);
    expect(res.body.properties).toHaveLength(2);
  });

  test('GET /properties returns correct structure', async () => {
    const res = await request(app).get('/properties');
    expect(res.body.properties[0]).toHaveProperty('id');
    expect(res.body.properties[0]).toHaveProperty('address');
    expect(res.body.properties[0]).toHaveProperty('status');
  });
test('properties endpoint responds with correct content type', async () => {
  const res = await request(app).get('/properties');
  expect(res.headers['content-type']).toMatch(/json/);
});
});