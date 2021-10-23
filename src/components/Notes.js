import React, {useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes } = context;
    useEffect(() => {
        getNotes()
    }, []);
    return (
        <div>
             <div className="container my-3">
            <h1>Your Notes</h1>
            {notes.map((note)=>{
                return <Noteitem note={note} />
            })}
            </div>
        </div>
    )
}

export default Notes;