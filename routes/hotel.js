//const { resolve, reject } = require('promise')
const { response } = require('express');
var express = require('express');
const{ render}=require('../app');
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
/*router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/hotel')
  }else{
    res.render('hotel/login',{"LoginErr":req.session.LoginErr})
    req.session.LoginErr=false
}

})*/

router.get('/signup',(req,res)=>{
  res.render('hotel/signup')
})
router.post('/signup',(req,res)=>{
  console.log(req.body);
  //console.log(req.files.Image);

  hotelHelpers.doSignup(req.body).then((response)=>{
    console.log(response)
    req.session.hotel=response
    req.session.hotelloggedIn=true
    res.redirect('/hotel/home')
  })
})
router.get('/home',async(req,res)=>{
  let hotels=await hotelHelpers.getHotel(req.session.hotel._id)


  res.render('hotel/home',{hotel:true,hotels})
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/edit_profile/:id',async(req,res)=>{
  let hotels=await hotelHelpers.getHotelDetails(req.params.id)
  console.log(hotels);
  res.render('hotel/edit_profile',{hotel:true,hotels})
})

router.post('/edit_profile/:id',(req,res)=>{
  hotelHelpers.updateHotel(req.params.id,req.body).then((id)=>{
    res.redirect('/hotel/home')
    if(req.files.image){
      let id=req.params.id
      let image=req.files.image
      //console.log(id)
      image.mv('./public/hotel-images/'+id+'.jpg')
    }
 })
})
router.get('/add-rooms',(req,res)=>{
  res.render('hotel/add-rooms',{hotel:req.session.hotel})

})
router.post('/add-rooms',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);
  hotelHelpers.addRoom(req.body,req.session.hotel).then((id)=>{
    console.log(id);
    let image=req.files.Image
    image.mv('./public/room-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.redirect('/hotel/rooms')
    req.session.hotelloggedIn = true
      }else{
        console.log(err);
      }
    })
  })

})
router.get('/rooms',async(req,res)=>{
  let rooms= await hotelHelpers.getAllRooms(req.session.hotel)
    console.log(rooms);
    res.render('hotel/rooms',{hotel:req.session.hotel,rooms})
    req.session.hotelloggedIn=true

  })
  
module.exports = router;

