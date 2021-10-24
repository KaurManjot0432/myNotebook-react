import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props)=>{

    const host = 'http://localhost:3001';
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);
      
        //fetch all notes
        const getNotes = async ()=>{
          let url = `${host}/api/notes/getNotes`;
          const response = await fetch(url, {
            method : 'GET',
            headers : {
              'auth-token' : localStorage.getItem('token')
            }
          });
          const res = await response.json();
          console.log(res.data);
          setnotes(res.data);
        }


      //add a note
      const addNote = async (title, description, tag)=>{
        let url = `${host}/api/notes/createNote`;
          const response = await fetch(url, {
            method : 'POST',
            headers :{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title, description, tag}) 
          });
          const note =  await response.json();
          console.log(note);
        setnotes(notes.concat(note.data));
      }

      //update a note
      const updateNote = async (id, title, description, tag)=>{
        let url = `${host}/api/notes/updateNotes/${id}`;
          const response = await fetch(url, {
            method : 'PATCH',
            headers :{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title, description, tag}) 
          });
        const note = await response.json();
        console.log(note);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          if(newNotes[index]._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setnotes(newNotes);
        
      }

      //delete a note
      const deleteNote = async (id)=>{
        console.log(id);
        let url = `${host}/api/notes/deleteNote/${id}`;
        const res = await fetch(url, {
          method : 'DELETE',
          headers : {
            'auth-token' : localStorage.getItem('token')
          }
        });
        const json = await res.json();
        console.log(json);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
      }
   
    return (
        <NoteContext.Provider value = {{notes,setnotes,getNotes,addNote, updateNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;