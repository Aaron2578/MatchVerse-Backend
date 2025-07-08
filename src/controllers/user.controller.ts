import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password,gender,dateOfBirth,phoneNumber,profession,salaryPerMonth,profileImageUrl} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try{
        const createdUser = await UserModel.create({
            name,
            email,
            password:hashedPassword,
            profileImageUrl,
            gender,
            dateOfBirth,
            phoneNumber,
            profession,
            salaryPerMonth
        });
        
        res.status(200).json({
            success:true,
            data:createdUser
        })
        return
    }catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"Unexpected Error"
        })
        return
    }
}

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
    const { email, password } = req.body;

        try{
        const user = await UserModel.findOne({email});

        if(!user){
            res.status(400).json({
                success:false,
                message:"User not found"
            })
            return
        }
        const isPasswordMatched = bcrypt.compareSync(password,user.password);

        if(!isPasswordMatched){
            res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
            return
        }

        res.status(200).json({
            success:true,
            data:user
        })
        return
    }catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"Unexpected Error"
        })
        return
    }
}

export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const gender = (req.query.gender as string)?.toLowerCase();
    const filter: Record<string, any> = {};

    if (gender === "male" || gender === "female") {
        filter.gender = gender;
    }

    try {
        const [users, total] = await Promise.all([
        UserModel.find(filter).skip(skip).limit(limit),
        UserModel.countDocuments(filter)
        ]);
    
         res.status(200).json({
          success: true,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          users
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
          success: true,
          message:"Unexpected error"
        });
    }
}

export const getDashboardData = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const [totalUserCount,maleCount,femaleCount] = await Promise.all([
          UserModel.countDocuments(),
          UserModel.countDocuments({gender:"male"}),
          UserModel.countDocuments({gender:"female"}),
        ]);
    
         res.status(200).json({
            success:true,
            totalUserCount,
            maleCount,
            femaleCount
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
          success: true,
          message:"Unexpected error"
        });
    }
}