//const { resolve, reject } = require('promise')
const bcrypt = require('bcrypt')
var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('express')
//const collections = require('../config/collections')
var objectId = require('mongodb').ObjectID

module.exports = {
    doLogin:(hotelData)=>{
        return new Promise(async(resolve,reject)=>{
            let Status=false
            let response={}
            let hotel=await db.get().collection(collection.Hoteluser_Collection).findOne({Email:hotelData.Email})
            let Password=await db.get().collection(collection.Hoteluser_Collection).findOne({Password:hotelData.Password})
            if(hotel){
                if(Password){
                    Status=true
                }
                if(Status){
                    console.log("success");
                    response.hotel=hotel
                    response.Status=true
                    resolve(response)
                }else{
                    console.log("failed");
                    resolve({Status:false})
                }
                
                    
           
            }else{
                console.log("db failed");
                resolve({status:false})
            }

            
        })
    }
}