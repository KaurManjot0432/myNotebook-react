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

const updateNotes = async (req, res)=>{
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNote  = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let doc = await note.findById(req.params.id);
    if(!doc){return res.status(404).send("Not Found")}

    if(doc.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    doc = await note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({doc});
}

const deleteNotes = async (req, res)=>{
    try{
        const doc = await note.findById(req.params.id);
        if(!doc){return res.status(404).send("Not Found")}
        console.log(doc);
        if(doc.user == req.user.id){
            doc.remove();
            res.status(200).json({data:doc});
        } else {
            return res.status(401).send("Not Allowed");
        }
    } catch(e){
        console.error(e);
        res.status(400).end();
    }
}

module.exports = { createNote, getNotes, updateNotes, deleteNotes };