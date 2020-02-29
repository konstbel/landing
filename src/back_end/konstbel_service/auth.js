var password = process.env.ADMIN_PASSWORD;

var auth = {
  authorize: function(req, res, next) {
    pwd = req.headers.authorization;

    if (pwd === password) {
      next(); 
    } else {
      res.status(401).send({ error: 'Anauthorized' });
    };
  }
};

module.exports = auth;
