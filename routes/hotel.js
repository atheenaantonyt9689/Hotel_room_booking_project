const { response } = require('express');
var express = require('express');
var router = express.Router();
const hotelHelpers = require('../helpers/hotel-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.hotelloggedIn) {
    next()
  } else {
    res.redirect('/hotel/login')
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {
  let hotel = req.session.hotel
  if (req.session.hotelloggedIn) {
    res.render('hotel/homepage', { hotel })
  }
  else {
    res.render('hotel/login', { "LoginErr": req.session.hotelloginErr })
    req.session.hotelloginErr = false
  }

})
// router.get('/login',(req,res)=>{
//   if(req.session.hotelloginErr){
//     res.redirect('hotel/login')
//   }else{
//     res.render('/hotel',{"loginErr":req.session.hotelloginErr})
//     req.session.hotelloginErr=false
//   }  
// })
router.get('/signup', (req, res) => {
  res.render('hotel/signup')
})
router.post('/signup', (req, res) => {
  hotelHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    req.session.hotel = response
    req.session.hotelloggedIn = true
    res.redirect('/hotel/homepage')
  })
})