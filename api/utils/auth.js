require('dotenv').config();
const request = require('request');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const data = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  audience: process.env.AUDIENCE,
  "grant_type": process.env.GRANT_TYPE
}

const options = {
  method: 'POST',
  url: process.env.AUTH_URL,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(data)
};

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dijon.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://gatsby-talk/api',
  issuer: 'https://dijon.auth0.com/',
  algorithms: ['RS256']
});

const getToken = () => {
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
}

module.exports = { jwtCheck, getToken };