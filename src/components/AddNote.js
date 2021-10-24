import React, {useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"", description:"", tag:""});
    
   const onChange = (e)=>{
        setnote({...note,[e.target.name]: e.target.value});
    }
    const HandleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note added successfully","success");
    } 

    return (
        <div className="container">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} name="title" id="title" minLength={3} required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} name="description" minLength={5} required id="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} name="tag" minLength={3} id="tag"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={HandleClick}>Add</button>
            </form>
            </div>
    )
}

export default AddNote
