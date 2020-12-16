const { resolve, reject } = require('promise')
const bcrypt = require('bcrypt')
var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('express')
const collections = require('../config/collections')
var objectId = require('mongodb').ObjectID

module.exports = {
    doLogin:(hotelData)=>{
        return new Promise((resolve,reject)=>{
            let loginStatus=false
            let response={}
            let hotel=await db.get().collection(collection.Hoteluser_Collection).findOne({Email:hotelData.Email})
            let password=await db.get().collection(collection.Hoteluser_Collection).findOne({})
            if(hotel){

            }
        })
    }
}