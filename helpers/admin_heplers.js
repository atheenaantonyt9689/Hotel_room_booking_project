var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
var generator=require('generate-password');
var nodemailer=require('nodemailer');
const { response } = require('express');
const { getMaxListeners } = require('../app');
var objectId=require('mongodb').ObjectID
 
var Password = generator.generate({
    length: 10,
    numbers: true
});
module.exports={
    doSignup:(adminData)=>{

        return new Promise(async(resolve,reject)=>{
            adminData.Password=await bcrypt.hash(adminData.Password,10)
            db.get().collection(collection.Admin_Collection).insertOne(adminData).then((data)=>{
                resolve(data.ops[0])

            })
               
        })
        


    },doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={

            }
            let admin=await db.get().collection(collection.Admin_Collection).findOne({Email:adminData.Email})
            if(admin){
                bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
                    if(status){
                        console.log("success");
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }

                })

            }else{
                console.log("login failed");
                resolve({status:false})
            }
        })
    },
    addHotel:(hotelData)=>{
        return new Promise(async(resolve,reject)=>{
        hotelData.Password=Password
        console.log(Password);
        db.get().collection(collection.Hoteluser_Collection).insertOne(hotelData).then((data)=>{
            console.log(hotelData);
            resolve(data.ops[0])
        })
        
        
        })
    },
    getAllHotels:()=>{
        return new Promise(async(resolve,reject)=>{
            let hotel= await db.get().collection(collection.Hoteluser_Collection).find().toArray()
            resolve(hotel)
        })

    },
    sendMail:(reciever)=>{
        return new Promise((resolve,reject)=>{
            
        console.log("Reciever",reciever)
        var Username=reciever.Email
        var Password=reciever.Password
        responseData={}
        var transporter=nodemailer.createTransport({
        service:'gmail',
            auth:{
                user:'atheenathaiparambil@gmail.com',
                pass:'Atheena1@@',

            },tls: {
                rejectUnauthorized: false
            }
           
        });
        var mailOptions={
            from:'atheenathaiaparambil@gmail.com',
            to:'atheenathaiparambil@gmail.com',
            subject:'send Email using Nodejs',
            text:"Thank uuu"
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Email sent:"+info.response);
                responseData.message="hotel registerd successfully"
                console.log(responseData.message);
                resolve(info)
            }
        });
        })
    }
}
    /*Findemails:(email)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={

            }
            let admin=await db.get().collection(collection.Admin_Collection).findOne({Email:email.Email})
            if(admin){
               
                console.log("hello");
                response.email=admin;
                response.status=true;
                resolve(response)
             console.log(resolve);
             console.log(admin);
           }else{
               console.log("email not found");
               resolve({status:false})
           }
 

        })
    },*/
