const express = require('express');
const passport = require('passport');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const app = express();

// Middleware to validate JWTs using the Auth0 public key
const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Protect routes with JWT validation
app.use('/api', jwtCheck);

// Example protected route
app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});