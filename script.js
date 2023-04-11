//defining the variables
 const addTitle = document.getElementById('addTitle');
 const addingNote = document.getElementById('addNote');
 const addButton = document.getElementById('addButton');
 const addNotesDiv= document.getElementById('addNotesDiv');
 const note =document.getElementsByClassName('note')[0];

 showNotes();

 //add Note section
 const add = ()=>{
  let notes=localStorage.getItem('notes');
  if(notes=== null){
    notes= [];
 }
 else{
     notes =JSON.parse(notes);
 }
    if(addingNote.value === '' ) {
        alert("Please add a note !!");   
       return;
  }
       //creating an object for user title and text input
           const addNoteObj ={
            user_title:addTitle.value,
            user_text:addingNote.value,
        }
        notes.push(addNoteObj);
        localStorage.setItem('notes',JSON.stringify(notes));
        addingNote.value = "";
        addTitle.value = "";

         showNotes();
 }

      function showNotes(){
        let addSection =``;
        let notes=localStorage.getItem('notes'); 

  if(notes === null){
    return;
  }    
  else{
    notes=JSON.parse(notes);
  }
        for(let i=0;i<notes.length;i++) {
        addSection+= 
        `<div class="note">
               <div class="title">${notes[i].user_title}</div>
               <div class="text">${notes[i].user_text}</div>
               <button>Delete</button>
       </div>`
        }
        addNotesDiv.innerHTML=addSection;
        console.log(notes);
      }


 addButton.addEventListener('click',add) 