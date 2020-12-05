var express = require('express');
var router = express.Router();
const adminHelpers=require('../helpers/admin_heplers')
/* GET HOME*/
//router.get('/',function(req,res,next){
  //let admin=req.session.admin
  //console.log(admin);
  //res.render('admin/admin_home')
//});

router.get('/', function(req, res, next) {
 let admin=req.session.admin
 if(req.session.loggedIn){
   res.render('admin/hotels',{ admin:true,admin})
 }else{
   res.render('admin/login',{"LoginErr":req.session.LoginErr})
   req.session.LoginErr=false
 }
  });
   
 //console.log(admin);
 // res.render('index',{ admin:true,admin });
//});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/admin')
  }else{
    res.render('admin/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
}

})
router.get('/signup',(req,res)=>{
  res.render('admin/signup')
})
router.post('/signup',(req,res)=>{
  adminHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
  
})
router.post('/login',(req,res)=>{
  //let admin=req.session.admin
  adminHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin')
    }else{
      req.session.loginErr=true
      res.redirect('/admin/login')
    }
  })

})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin/login')
})
router.get('/add_hotels',function(req,res){
  res.render('admin/add_hotels')

})
router.post('/add_product',(req,res)=>{
  console.log(req.body);
})

module.exports = router;
