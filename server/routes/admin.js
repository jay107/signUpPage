const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js")
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/admin/signup/", (req, res) => {

    User.findOne({ email: req.body.email })
    .exec(( error, user ) => {
        if(user){
            return res.status(422).json({ error: "Admin already exists" });
        }
        
            const { firstname, lastname, email, password } = req.body;

            const _user = new User({
                firstname,
                lastname,
                email,
                hash_password,
                username: Math.random().toString(),
                role: "admin"
            })

            _user.save((error, data) => {
              
                if(data){
                    return res.status(200).json({message: "Admin created successfully..."})
                }
                if(error){
                    return res.status(400).json({error: "Something went wrong.."})
                }
                
            })
        
    })
});

router.post("/admin/signin/", (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body)
    if( !email, !password ){
        return res.status(400).json({error: "plz filled all the property..."})
    }
    
    const userLogin = User.findOne({email: email})
    .then((user) => {
        
        if(userLogin){
            const isMatch = bcrypt.compare( password , userLogin.password);
    
            const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"})
    
            if(!isMatch){
                return res.status(400).json({error: "invalid credentials..."});
            }
            if(user.role != "admin"){
                return res.status(400).json({error: "invalid credentials.."});
            }
            else{
                console.log(token)
                return res.status(200).json({token, message: "signin successfully..."});
            }
        }
        else{
            return res.status(400).json({error: "invalid credentials."});
        }
   
    });
});

module.exports = router;