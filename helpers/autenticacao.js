const request = require('supertest');
require('dotenv').config();

const baseURL = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.HML_BASE_URL;

function makeRequest(method, uri, body ) {
  const res = request(baseURL)
        [method](uri)
        .set('Content-Type', 'application/json')
        .send(body)
    return res
}

module.exports = {
    makeRequest
}