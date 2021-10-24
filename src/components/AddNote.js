import React, {useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"", description:"", tag:""});
    
   const onChange = (e)=>{
        setnote({...note,[e.target.name]: e.target.value});
    }
    const HandleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    } 

    return (
        <div className="container">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} name="title" id="title" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} name="description" id="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} name="tag" id="tag"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={HandleClick}>Add</button>
            </form>
            </div>
    )
}

export default AddNote
