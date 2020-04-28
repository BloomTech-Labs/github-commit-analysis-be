const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null)
    res.status(401).json({
      success: false,
      message: `no token`,
    }); // no token. unauthorized.

  req.token = token;
  jwt.verify(token, process.env.SESSION_SECRET, (err, token) => {
    if (err)
      res.status(403).json({
        success: false,
        message: `bad token`,
      }); // bad token. forbidden.

    req.id = token.id;
    next();
  });
}

module.exports = { authenticateToken };
