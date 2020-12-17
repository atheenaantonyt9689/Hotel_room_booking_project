//const { resolve, reject } = require('promise')
const { response } = require('express');
var express = require('express');
var router = express.Router();
const hotelHelpers = require('../helpers/hotel-helpers');
const verifyLogin=(req,res,next)=>{
  if (req.session.hotelloggedIn){
    next()
  }else{
    res.redirect('/hotel/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let hotel=req.session.hotel
  if (req.session.hotelloggedIn){
    res.render('hotel/home',{hotel:true,hotel})
  }
  else{
    res.render('hotel/login',{'LoginErr':req.session.LoginErr})
    req.session.LoginErr=false
  }
  
});
router.post('/login',(req,res)=>{
  req.session.hotelloggedIn=false
  hotelHelpers.doLogin(req.body).then((response)=>{
    if(response.Status){
     console.log(response);
     req.session.hotelloggedIn=true
     req.session.hotel=response.hotel
     res.redirect('/hotel')    
    }else{
    req.session.LoginErr=true
    res.redirect('/hotel')
    }
  })
  
})
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/hotel')
  }else{
    res.render('hotel/login',{"LoginErr":req.session.LoginErr})
    req.session.LoginErr=false
}

})
router.get('/signup',(req,res)=>{
  res.render('hotel/signup')
})

module.exports = router;
/*const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}


/* GET HOME*/
/*router.get('/', function(req, res, next) {
  //adminHelpers.getAllHotels().then((hotel)=>{
    //console.log(hotel);
    let admin=req.session.admin
    if(req.session.loggedIn){
      res.render('admin/admin-home',{ admin:true,admin})
    }else{
      res.render('admin/login',{"LoginErr":req.session.LoginErr})
      req.session.LoginErr=false
    }
    });
    router.post('/login',(req,res)=>{
      req.session.loggedIn=false
      //let admin=req.session.admin
      adminHelpers.doLogin(req.body).then((response)=>{
        if(response.status){
          req.session.loggedIn=true
          req.session.admin=response.admin
          res.redirect('/admin')
        }else{
          req.session.loginErr=true
          res.redirect('/admin')
        }
      })
    
    })
  
  router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/admin')
  }else{
    res.render('admin/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
}

})*/

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