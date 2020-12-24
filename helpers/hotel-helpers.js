const { resolve, reject } = require('Promise')
const bcrypt = require('bcrypt')
var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('express')
//const collections = require('../config/collections')
var objectId = require('mongodb').ObjectID
const collections = require('../config/collections')

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
    /*Profile: (hotelData,callback) => {
        console.log(hotelData);
        db.get().collection('hotel').insertOne(hotelData).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    }

}*/
        doSignup: (hotelData) => {
            return new Promise(async (resolve, reject) => {
                db.get().collection(collection.Hoteluser_Collection).insertOne(hotelData).then((data) => {
                     console.log(hotelData)
                    resolve(data.ops[0])
                })
    
    
            })
        },
        getHotel: (hotelid) => {
            return new Promise((resolve, reject) => {
                db.get().collection(collection.Hoteluser_Collection).findOne({ _id: objectId(hotelid) }).then((hotel) => {
                    resolve(hotel)
                })
            })
        },
        getHotelDetails: (hotelid) => {
            return new Promise((resolve, reject) => {
                 db.get().collection(collection.Hoteluser_Collection).findOne({ _id: objectId(hotelid) }).then((hotel) => {
                     resolve(hotel)
                 })
             })
         },
         updateHotel: (hotelid, hotelData) => {
            console.log(hotelData);
            console.log(hotelid);
            return new Promise((resolve, reject) => {
                db.get().collection(collection.Hoteluser_Collection)
                    .updateOne({ _id: objectId(hotelid) }, {
                        $set: {
                            hotelName: hotelData.hotelName,
                            hotelEmail: hotelData.hotelEmail,
                            hotelContactno: hotelData.hotelContactno,
                            hotelLocation: hotelData.hotelLocation,
                            hotelAddress: hotelData.hotelAddress
    
                        }
                    }).then((response) => {
                        resolve()
                    })
            })
        },
        addRoom: (hotelData, hotelId) => {
            return new Promise(async (resolve, reject) => {
                let rooms = {
                   hotelid: objectId(hotelId._id),
                    rooms: [hotelData]
    
                }
                
                db.get().collection(collection.Room_Colletction).insertOne(rooms).then((data) => {
                    console.log(hotelData);
                    resolve(data.ops[0]._id)
                })
    
    
            })
        },
       getAllRooms: (hotelid) => {
            return new Promise(async (resolve, reject) => {
                let rooms = await db.get().collection(collection.Room_Colletction).aggregate([
                    {
                        $match: { hotelid: objectId(hotelid._id) }
                    },
                    {
                        $unwind: '$rooms'
                    },
                    {
                        $project: {
                            RoomName: '$rooms.RoomName',
                            Available: '$rooms.Available',
                            RoomPrice: '$rooms.RoomPrice',
                            type: '$rooms.type',
                            features: '$rooms.features',
                            
                           
                            //image: '$rooms.image'
                        }
                    },
                    {
                        $lookup: {
                            from: collection.Room_Colletction,
                            localField: 'hotelid',
                            foreignField: '_id',
                            as: 'rooms'
                        }
                    }
                ]).toArray()
                console.log("roomsss",rooms);
                resolve(rooms)
            })
        //getAllRooms:()=>{
            //return new Promise(async(resolve,reject)=>{
                //let rooms=await db.get().collection(collection.Room_Colletction).find().toArray()
                //resolve(rooms)
            //})
        //},
        /*getAllHotels:()=>{
            return new Promise(async(resolve,reject)=>{
                let hotel= await db.get().collection(collection.Hoteluser_Collection).find().toArray()
                resolve(hotel)
            })
    
        }*/
}    

    
    /*getHotelDetails: (hotelid) => {
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
