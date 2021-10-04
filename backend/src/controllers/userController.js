const user = require('../models/User');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodb$oy';

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {

        const User = await user.findOne({ email: req.body.email });
        if (!User) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            newUser = await user.create({
                name : req.body.name,
                password : securedPassword,
                email : req.body.email
            });
            // res.json(newUser);
            const data = {
                user:{
                  id: user.id
                }
              }
              const authtoken = jwt.sign(data, JWT_SECRET);
          
              res.json({authtoken})
        } else {
            return res.status(400).json({ error: "email already taken" });
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).send("some error occured");
    }
}

module.exports = { create }