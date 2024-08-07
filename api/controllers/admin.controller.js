import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const userDetails = async(req,res,next)=> {
    try {
        const users = await User.find({admin: { $ne: true}});
        res.status(200).json(users)
    } catch (error) {
        next(error)
        console.log(error);
    }
}

export const deleteUser = async(req, res, next) => {
    if(!req.params.id){
        return next(errorHandler(401, "You cant delete this account"))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has deleted.')
    } catch (error) {
        next(error)
    }
}


export const searchUser = async(req, res, next) => {
    const { search } = req.body;
    try {
        const users = await User.find({
            admin: { $ne: true },
            $or: [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }   
            ]
        });
        if (!users || users.length === 0) {
            return res.status(400).json({ error: "No users found matching the search criteria." });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}



export const userSelectedToEdit = async(req,res,next) => {
    console.log('here');
    const userId = req.params.id;

    try {
        const validUsr = await User.findOne({_id: userId});
        if(!validUsr) {
            return next(errorHandler(401, 'user Not found'))
        }
        res.status(200).json(validUsr);
    } catch (error) {
        next(error)
        console.log(error);
        
    }
    
}



export const updateUser = async (req, res, next) => {
    console.log("Update User");
    
    // const userId = req.params.id
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
