var express = require('express');
var router = express.Router();
var auth = require ('../auth');
var db = require('../db').db


router.get('/', auth.authorize, function(req, res, next) {
  db.any('SELECT * FROM subscriptions')
    .then(function(data) {
      res.json({subscriptions: data});
    })
    .catch(function(error) {
      res.status(500).end();
    })
});

router.post('/', function (req, res, next) {
  var email = req.body.email
  db.none('INSERT INTO subscriptions(email) VALUES($1)', [email])
    .then(function() {
      res.status(200).end();
    })
    .catch(function(error) {
      res.status(500).end();
    })
});

router.post('/publish', auth.authorize, function (req, res, next) {
  res.send('publish msg');
});

module.exports = router;
