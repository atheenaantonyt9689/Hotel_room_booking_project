var express = require('express');
const { response } = require('express');
var router = express.Router();
const adminHelpers=require('../helpers/admin_heplers')  
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}


/* GET HOME*/
router.get('/', function(req, res, next) {
  //adminHelpers.getAllHotels().then((hotel)=>{
    //console.log(hotel);
    let admin=req.session.admin
    if(req.session.loggedIn){
      res.render('admin/admin-home',{ admin})
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
          req.session.LoginErr=true
          res.redirect('/admin')
        }
      })
    
    })
  
 // router.get('/login',(req,res)=>{
 // if(req.session.loggedIn){
    //res.redirect('/admin')
  //}else{
    //res.render('admin/login',{"loginErr":req.session.loginErr})
    //req.session.loginErr=false
//}

//})
router.get('/signup',(req,res)=>{
  res.render('admin/signup')
})
router.post('/signup',(req,res)=>{
  adminHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
  
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})
router.get('/hotels',(req,res)=>{
  adminHelpers.getAllHotels().then((hotel)=>{
    console.log(hotel);
    res.render('admin/hotels',{admin:true,hotel})
  
  })
  
})
router.post('/hotels',(req,res)=>{
  //console.log(req.body);
  //res.render('admin/hotels')
  adminHelpers.addHotel(req.body,(hotel)=>{
    res.render("admin/hotels")
  })
})

router.get('/hotels',(req,res)=>{
  adminHelpers.getAllHotels().then((hotel)=>{
    res.render('admin/hotels',{admin:req.session.admin,hotel})
  })
})

router.get('/add-hotels',(req,res)=>{
  
    res.render('admin/add-hotels',{admin:req.session.admin})
  
  })
  

router.post('/add-hotels',(req,res)=>{
  adminHelpers.addHotel(req.body).then((response)=>{
    console.log(response)
    req.session.admin=response
    req.session.loggedIn=true
    res.redirect("/admin/hotels")
  })
  adminHelpers.sendMail(req.body).then((response)=>{
    req.session.admin=response
    req.session.loggedIn=true
    //res.redirect('/admin/hotels')
  })
})
router.get('/delete-hotel/:id',(req,res)=>{

  let hotelId=req.params.id
  console.log(hotelId)
  adminHelpers.deleteHotel(hotelId).then((response)=>{
    res.redirect('/admin/hotels')
  })
})

router.get('/edit-hotel/:id',async(req,res)=>{
  let hotels= await adminHelpers.getHotelDetails(req.params.id)
  console.log(hotels);
  res.render('admin/edit-hotel',{ admin:true,hotels})
})
router.post('/edit-hotel/:id',(req,res)=>{
  console.log(req.params._id);
  adminHelpers.upadateHotel(req.params.id, req.body).then(()=>{
    res.redirect('/admin/hotels')
  })
})
module.exports = router;
//hotel regisration section
/*router.get('/hotel-registration',function(req,res){
  res.render('admin/hotel-registration');
  });
  var email;
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    
    auth: {
        user: 'noemy.oconner@ethereal.email',
        pass: 'Y1SxwbjRkDSZ5gube1'
    }
});
router.post('/hotel-registration',(req,res)=>{
  email=req.body.Email;
  username=req.body.Username;
  password=req.body.Password;
// send mail with defined transport object
var mailOptions={
to: req.body.Email,
subject: "USERNAME AND PASSWORD ",
html: "<h3>USERNAME:</h3>"+"<h2 style='font-weight:bold;'>"+Username+"<h2>PASSWORD:</h2>"+"<h2 style='font-weight:bold;'>"+Password+"</h2>"
 // html body
};
transporter.sendMail(mailOptions, (error, info) => {
if (error) {
return console.log(error);
}
console.log('Message sent: %s', info.messageId);
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
res.render('/otp');
});
});
router.post('/otp',function(req,res){
  if(req.body.otp==otp){
  res.render("/");
  }
  else{
  res.render('/otp',{msg : 'otp is incorrect'});
  }
  });*/
  
  


