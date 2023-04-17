//defining the variables
const addTitle = document.getElementById('addTitle');
const addingNote = document.getElementById('addNote');
const addButton = document.getElementById('addButton');
const addNotesDiv = document.getElementById('addNotesDiv');
const deleteNotesDiv = document.getElementById('deleteNotesDiv');
const note = document.getElementsByClassName('note')[0];
let deletedNotesArr =JSON.parse(localStorage.getItem('deletedNotes')) || [];


showNotes();

//adding Note section starts here
const add = () => {
  let notes = localStorage.getItem('addnotes');

  if (notes === null) {
    notes = [];
  }
  else {
    notes = JSON.parse(notes); //convert back from string to objcet
  }

  if (addingNote.value === '') {  //if note is empty
    alert("Please add a note !!");
    return;
  }

  //creating an object for user title and text input
  const addNoteObj = {
         user_title:addTitle.value,
         user_text:addingNote.value,
  }
  notes.push(addNoteObj);
  localStorage.setItem('addnotes', JSON.stringify(notes)); //converting obj to string 
  addingNote.value = "";
  addTitle.value = "";
  showNotes();
}
//adding Note section Ends here

//deleting the note section 
function removeNote(index) {
  let notes = JSON.parse(localStorage.getItem('addnotes'));
  let deletedNote = notes.splice(index, 1)[0];
  deletedNotesArr.push(deletedNote);
  localStorage.setItem('addnotes', JSON.stringify(notes));
  localStorage.setItem('deletedNotes', JSON.stringify(deletedNotesArr));
  showNotes();
}



function showNotes() {
  let addSection = ``;
  let deletedSection = ``;
  let notes = localStorage.getItem('addnotes');

  if (notes === null) {
    return;
  }
  else {
    notes = JSON.parse(notes);
  }

  for (let i = 0; i < notes.length; i++) {
    addSection += `
      <div class="note">
        <div class="title">${notes[i].user_title}</div>
        <div class="text">${notes[i].user_text}</div>
        <button class="editButton" data-index="${i}">Edit</button>
        <button class="deleteButton" data-index="${i}"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  }

  addNotesDiv.innerHTML = addSection;


  //delete section
  let deleteButtons = document.getElementsByClassName("deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      removeNote(this.getAttribute("data-index"));
    });
  }

  

  // display deleted notes section
  let deletedNotes = localStorage.getItem('deletedNotes');
  if (deletedNotes !== null) {
    deletedNotes = JSON.parse(deletedNotes);
    for (let i = 0; i < deletedNotes.length; i++) {
      if (i === 0) {
        deletedSection += `
  <h3>Deleted Notes : </h3>
`;
      }
      deletedSection += `
        <div class="dnote">
        <div class="title">${deletedNotes[i].user_title}</div>
          <div class="dtext">${deletedNotes[i].user_text}</div>
          <button class="restoreButton" data-index="${i}"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      `;
    }

    deleteNotesDiv.innerHTML = deletedSection;

    let restoreButtons = document.getElementsByClassName("restoreButton");
  for (let i = 0; i < restoreButtons.length; i++) {
  restoreButtons[i].addEventListener("click", function () {
    restoreNote(this.getAttribute("data-index"));
  });
}
  }
}

//restoring the notes 
function restoreNote(index) {
  let notes = JSON.parse(localStorage.getItem('addnotes'));
  let deletedNotes = JSON.parse(localStorage.getItem('deletedNotes'));
  let restoredNote = deletedNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  localStorage.setItem('addnotes', JSON.stringify(notes));
  localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
  showNotes();
}


addButton.addEventListener('click', add) 