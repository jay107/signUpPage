const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/signup", (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(( error, user ) => {
        if(user){
            return res.status(422).json({ error: "user already exists" });
        }
        
            const { firstName, lastName, email, password } = req.body;

            if(!firstName || !lastName || !email || !password){
                return res.status(400).json({error: "plz filled all the property.."})
            }

            bcrypt.hash(password, 12).then(hash_password => {
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: Math.random().toString()
            })
            _user.save().then(user => {
                res.status(200).json({message: "user saved successfully.."})
            }).catch(error => console.log(error))
        })
        })
});


router.post("/signin",  (req, res) => {

    if( !email, !password ){
        return res.status(400).json({error: "plz filled all the property..."})
    }

     User.findOne({email: email}).then((savedUser) => {
        if(!savedUser){
            return res.status(400).json({error: "user does not exist..."});
        }
 
        bcrypt.compare(password, savedUser.hash_password).then(doMatch => {
            if(doMatch){
                const token = jwt.sign({_id: savedIUser._id, role: savedUser.role}, process.env.JWT_SECRET);

                const {_id, email, password} = savedUser;

                res.json({message: "user signin successfully.."})
            }
            else{
                return res.status(400).json({error: "invalid emailId or password.."})
            }
        })
     });
});

module.exports = router;