var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
//const collections = require('../config/collections')
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
    }
}