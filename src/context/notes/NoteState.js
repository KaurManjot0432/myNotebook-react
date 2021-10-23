import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props)=>{

    const notesInitial = 
         [
          {
            "_id": "6161bf96bfae081b54687962",
            "user": "615dc44b512b083e080b6ce6",
            "title": "Good wishes",
            "description": "Keep working hard until you achieve your goals!!",
            "tag": "motivation",
            "date": "2021-10-09T16:13:10.097Z",
            "__v": 0
          },
          {
            "_id": "616f665ba9a10245001691d1",
            "user": "615dc44b512b083080b6ce6",
            "title": "Motivational quotes",
            "description": "Your time to rock will come!!",
            "tag": "Motivation",
            "date": "2021-10-20T00:44:11.435Z",
            "__v": 0
          }
        ]
      
      const [notes, setnotes] = useState(notesInitial);

      //add a note
      const addNote = (title, description, tag)=>{
        const note = {
          "_id": "616f665ba9a10245001691d1",
          "user": "615dc44b512b083e080b6ce6",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-10-20T00:44:11.435Z",
          "__v": 0
        }
        setnotes(notes.concat(note));
      }

      //update a note
      const updateNote = (id, title, description, tag)=>{

      }

      //delete a note
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
      }
   
    return (
        <NoteContext.Provider value = {{notes,setnotes,addNote, updateNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;