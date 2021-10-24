const user = require('../models/User');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'manjot@kaur';

const create = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {

        const User = await user.findOne({ email: req.body.email });
        if (!User) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            newUser = await user.create({
                name: req.body.name,
                password: securedPassword,
                email: req.body.email
            });
            // res.json(newUser);
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const auth_token = jwt.sign(data, JWT_SECRET,  { expiresIn: '1800s' });

            res.json({success, auth_token })
        } else {
            return res.status(400).json({success,error: "email already taken" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send("some error occured");
    }
}

const signin = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        const User = await user.findOne({ email: req.body.email });
        if (!User) {
            return res.status(400).json({ success, error: "Enter valid credentials!" });
        }
        const checkPassword = await bcrypt.compare(req.body.password, User.password);

        if (!checkPassword) {
            return res.status(400).json({ success, error: "Enter valid credentials!" });
        }

        const data = {
            user: {
                id: User.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (err) {
        console.error(err);
        return res.status(500).send("some error occured");
    }
}
const getProfile = async (req,res)=>{
    try{
        const userId = req.user.id;
        const User = await user.findById(userId).select("-password");
        if(!User){ 
            return res.status(401).json({error : "Access Denied!"});
        }
        res.send(User);
    } catch(err){
        console.error(err);
        return res.status(500).send("some error occured");
    }

}

module.exports = { create, signin, getProfile }