import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";



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
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(400).json({ error: "No users found matching the search criteria." });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
