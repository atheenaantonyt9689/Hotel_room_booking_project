//const { response } = require('express');
const express = require('express')
var router = express.Router();
const app = express()
//const passport = require('passport');
const userHelpers = require('../helpers/user-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});

module.exports = router;
