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
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGM0NGI1MTJiMDgzZTA4MGI2Y2U2In0sImlhdCI6MTYzMzgwMTE4NH0.8Y_gh2_R2_jGZXrFWDpTJoZqLJiybq6aIN6BvQvQJco'
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
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGM0NGI1MTJiMDgzZTA4MGI2Y2U2In0sImlhdCI6MTYzMzgwMTE4NH0.8Y_gh2_R2_jGZXrFWDpTJoZqLJiybq6aIN6BvQvQJco'
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
            method : 'PUT',
            headers :{
              'Content-Type' : 'application/json',
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGM0NGI1MTJiMDgzZTA4MGI2Y2U2In0sImlhdCI6MTYzMzgwMTE4NH0.8Y_gh2_R2_jGZXrFWDpTJoZqLJiybq6aIN6BvQvQJco'
            },
            body : JSON.stringify() 
          });
          const res =  response.json();
      }

      //delete a note
      const deleteNote = async (id)=>{
        console.log(id);
        let url = `${host}/api/notes/deleteNote/${id}`;
        const res = await fetch(url, {
          method : 'DELETE',
          headers : {
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGM0NGI1MTJiMDgzZTA4MGI2Y2U2In0sImlhdCI6MTYzMzgwMTE4NH0.8Y_gh2_R2_jGZXrFWDpTJoZqLJiybq6aIN6BvQvQJco'
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