var express = require('express');
var router = express.Router();
const crypto = require('crypto');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.header( process.env.HEADER_X_NEXT_LEVEL, "/get")
  res.cookie(process.env.COOKIE_LEVEL_NAME, '1')
  res.cookie(process.env.COOKIE_USERNAME, crypto.randomUUID())
  
  res.render('index', { title: 'IF5000' });
});


router.use('/error', function(req, res, next) {
  res.header( process.env.HEADER_X_NEXT_LEVEL, "/get")
  res.cookie(process.env.COOKIE_LEVEL_NAME, '1')

  res.status(400)
  res.send(req.query);
});

module.exports = router;
