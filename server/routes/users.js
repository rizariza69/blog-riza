var express = require('express');
var router = express.Router();
var Controller = require('../controllers/users')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', Controller.register)
      .post('/login', Controller.login)

module.exports = router;
