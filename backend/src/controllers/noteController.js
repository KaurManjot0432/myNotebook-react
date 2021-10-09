const note = require('../models/Note');
const { validationResult } = require('express-validator/check');

const createNote = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const { title, description, tag } = req.body;
        const doc = await note.create({
            title, description, tag, user : req.user.id
        });
        res.status(201).json({data:doc});
    }catch(err){
        console.error(err);
        return res.status(500).send("some error occured");
    }
}

const getNotes = async (req,res)=>{
    try{
        const doc = await note.find({user : req.user.id});
        if(!doc) {
            return res.status(404).end();
        }
        res.status(200).json({data: doc});
    }catch(err){
        console.error(err);
        return res.status(500).send("some error occured");
    }
}



module.exports = { createNote, getNotes };