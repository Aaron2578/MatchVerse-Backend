import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},

    profileImageUrl: {type:String,required:true},
    gender: {type:String,enum:["male","female"],required:true},
    dateOfBirth: {type:Date,required:true},
    phoneNumber: {type:Number,required:true},
    
    profession: {type:String,required:true},
    salaryPerMonth: {type:Number,required:true},
});

export const UserModel = mongoose.model("user",userSchema);