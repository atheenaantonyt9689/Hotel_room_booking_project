var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hotels/login' );
});
router.post('/login',(req,res)=>{
  
})

module.exports = router;

  //else {
    //res.render('hotel/login', { "LoginErr": req.session.hotelloginErr })
   // req.session.hotelloginErr = false
  //}

//})
// router.get('/login',(req,res)=>{
//   if(req.session.hotelloginErr){
//     res.redirect('hotel/login')
//   }else{
//     res.render('/hotel',{"loginErr":req.session.hotelloginErr})
//     req.session.hotelloginErr=false
//   }  
// })
/*router.get('/signup', (req, res) => {
  res.render('hotel/signup')
})
router.post('/signup', (req, res) => {
  hotelHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    req.session.hotel = response
    req.session.hotelloggedIn = true
    res.redirect('/hotel/homepage')
  })
})*/