import User from "../models/user.model.js";



export const userDetails = async(req,res,next)=> {
    try {
        const users = await User.find({admin: { $ne: true}});
        res.status(200).json(users)
    } catch (error) {
        next(error)
        console.log(error);
    }
}