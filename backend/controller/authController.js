const User = require("../models/User");
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register 
const register =async (req,res)=>{
    try{
        const {name, email, password}=req.body;
        // check user
        const existuser=await User.findOne({email});
        if(existuser){
            return res.status(400).json({message:'User already exists'});
        }
        // Password hash
        const Passwordhash=await bcrypt.hash(password,10);
         // Create user
         const user= await User.create({
            name,
            email,
            password: Passwordhash
         })

    }catch(error){
         res.status(500).json({
            message: error.message
        });

   }
}
// LOGIN
const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        // Find user
        const user= await User.findOne({email})
        if(!user){
              return res.status(404).json({
                message: "User not found"
            });
        }
        // Check password
        const ismatch=await bcrypt.compare(
          password,
          user.password
        )
          if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }
           // Generate token
           const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresin:"id"
            
            }
           );
            res.json({
            message: "Login successful",
            token
        });
    }catch(error){
         res.status(500).json({
            message: error.message
        });

    }
} 
module.exports={register,login};