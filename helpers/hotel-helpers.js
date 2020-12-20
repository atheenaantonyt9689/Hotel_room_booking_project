const { resolve, reject } = require('Promise')
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
    },
    doSignup: (hotelData) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.Hoteluser_Collection).insertOne(hotelData).then((data) => {

                resolve(data.ops[0])
            })


        })
    },
   /* updateHotel: (hotelid, hotelData) => {
        console.log(hotelData);
        console.log(hotelid);
        return new Promise((resolve, reject) => {
            db.get().collection(collection.HOTELUSER_COLLECTION)
                .updateOne({ _id: objectId(hotelid) }, {
                    $set: {
                        hotelname: hotelData.Name,
                        email: hotelData.Email,
                        phone: hotelData.Contactno,
                        location: hotelData.Location,
                        address: hotelData.Address

                    }
                }).then((response) => {
                    resolve()
                })
        })
    },
    getHotelDetails: (hotelid) => {
       return new Promise((resolve, reject) => {
            db.get().collection(collection.Hoteluser_Collection).findOne({ _id: objectId(hotelid) }).then((hotel) => {
                resolve(hotels)
            })
        })
    },
    getHotel: (hotelid) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.HOTELUSER_COLLECTION).findOne({ _id: objectId(hotelid) }).then((hotel) => {
                resolve(hotel)
            })
        })
    },
    addRoom: (hotelData, hid) => {
        return new Promise(async (resolve, reject) => {
            let rooms = {
                hotelid: objectId(hid._id),
                rooms: [hotelData]

            }
            
            db.get().collection(collection.ROOM_COLLECTION).insertOne(rooms).then((data) => {
                console.log(hotelData);
                resolve(data.ops[0]._id)
            })


        })
    },
    /*etAllRooms: (hotelid) => {
        return new Promise(async (resolve, reject) => {
            let rooms = await db.get().collection(collection.ROOM_COLLECTION).aggregate([
                {
                    $match: { hotelid: objectId(hotelid._id) }
                },
                {
                    $unwind: '$rooms'
                },
                {
                    $project: {
                        roomname: '$rooms.roomname',
                        price: '$rooms.price',
                        features: '$rooms.features',
                        avileblerooms: '$rooms.avileblerooms',
                        type: '$rooms.type',
                        image: '$rooms.image'
                    }
                },
                {
                    $lookup: {
                        from: collection.ROOM_COLLECTION,
                        localField: 'hotelid',
                        foreignField: '_id',
                        as: 'rooms'
                    }
                }
            ]).toArray()
            console.log("roomsss",rooms);
            resolve(rooms)
        })

    }*/
}