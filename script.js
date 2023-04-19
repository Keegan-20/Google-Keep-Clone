//defining the variables
const addTitle = document.getElementById('addTitle');
const addingNote = document.getElementById('addNote');
const addButton = document.getElementById('addButton');
const addNotesDiv = document.getElementById('addNotesDiv');
const deleteNotesDiv = document.getElementById('deleteNotesDiv');
const note = document.getElementsByClassName('note')[0];
const deletedNotesArr =JSON.parse(localStorage.getItem('deletedNotes')) || [];
const archiveNotesDiv = document.getElementById('archiveNotesDiv');

showNotes();

//adding Note section starts here
const add = () => {
  let notes = JSON.parse(localStorage.getItem('addnotes')) ?? []; // using the nullish coalescing operator to assign empty array if null or undefined.

  if (!Array.isArray(notes)) { // check if notes is an array
    throw new Error('Invalid notes data');
  }


  if (!addingNote.value.trim()) //to check if there is no user input
  {
    alert("Please add a note !!");
    return; // use early return to exit if addingNote is empty

  } 
  const userTitle = addTitle.value.trim();
  const userText = addingNote.value.trim().replace(/\n/g, '<br>'); //break the line on hitting enter

  // if (!userTitle || !userText) return; // validate user input

  const addNoteObj = {
    user_title: userTitle,
    user_text: userText,
  };

  notes.push(addNoteObj);
  localStorage.setItem('addnotes', JSON.stringify(notes)); // convert array to string and save to localStorage

  // clear input fields and show updated notes
  addingNote.value = "";
  addTitle.value = "";
  showNotes();
};

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

//showNotes function
function showNotes() {
  let addSection = ``;
  let deletedSection = ``;
  let archivedSection =``;
  let notes = localStorage.getItem('addnotes');

  if (notes === null) {
    return;
  }
  else {
    notes = JSON.parse(notes);
  }

  for (let i = 0; i < notes.length; i++) {

    if(i===0){
      addSection+=`
      <h3> Notes: </h3>`;
    }
    addSection += `
      <div class="note">
        <div class="title">${notes[i].user_title}</div>
        <div class="text">${notes[i].user_text}</div>
        <button class="editButton" data-index="${i}">Edit</button>
        <button class="deleteButton" data-index="${i}">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button class="archiveButton" data-index="${i}">
        <i class="fa-solid fa-circle-chevron-down"></i>

        </button>
      </div>
    `;
  }
  addNotesDiv.innerHTML = addSection;

  let archivedNotes = localStorage.getItem('archivedNotes');
  if (archivedNotes !== null) {
    archivedNotes = JSON.parse(archivedNotes);
    for (let i = 0; i < archivedNotes.length; i++) {

      if(i===0){
        archivedSection=`
        <h3> Archived Notes: </h3>
`;
      }
      archivedSection += `
        <div class="archived-note">
        <div class="title">${archivedNotes[i].user_title}</div>
          <div class="atext">${archivedNotes[i].user_text}</div>
          <button class="unarchiveButton" data-index="${i}">
            Unarchive
          </button>
        </div>
      `;
    }
    archiveNotesDiv.innerHTML = archivedSection;
  }


 // event listener for edit button
 let editButtons = document.getElementsByClassName("editButton");
 for (let i = 0; i < editButtons.length; i++) {
   editButtons[i].addEventListener("click", function () {
     editNote(this.getAttribute("data-index"));
   });
 }


  //event listener for delete button
  let deleteButtons = document.getElementsByClassName("deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      removeNote(this.getAttribute("data-index"));
    });
  }

// event listener for archive button
let archiveButtons = document.getElementsByClassName("archiveButton");
for (let i = 0; i < archiveButtons.length; i++) {
  archiveButtons[i].addEventListener("click", function () {
    archiveNote(this.getAttribute("data-index"));
  });
}

// event listener for unarchive button
let unarchiveButtons = document.getElementsByClassName("unarchiveButton");
for (let i = 0; i < unarchiveButtons.length; i++) {
  unarchiveButtons[i].addEventListener("click", function () {
    unarchiveNote(this.getAttribute("data-index"));
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

    deleteNotesDiv.innerHTML =deletedSection;

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


//edit button 
function editNote (index) {
  let notes = JSON.parse(localStorage.getItem('addnotes'));
  let note = notes[index];

  // display a form for the user to edit the note
    const editForm = `
    <h3> Edit Note: </h3>

    <div class="enote">
      <input id="editTitle" value="${note.user_title}" />
      <textarea id="editNote">${note.user_text}</textarea>
      <button id="saveButton" data-index="${index}">Save</button>
    </div>
  `;

  addNotesDiv.innerHTML = editForm;

  // add event listener for save button
  let saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function () {
    saveNoteChanges(this.getAttribute("data-index"));
  });
}

function saveNoteChanges(index) {
  let notes = JSON.parse(localStorage.getItem('addnotes'));
  let note = notes[index];

  // update the note object with the new values
  note.user_title = document.getElementById('editTitle').value;
  note.user_text = document.getElementById('editNote').value;

  localStorage.setItem('addnotes', JSON.stringify(notes));
  // display the updated note
  showNotes();
}

//archive section

// archive a note
function archiveNote (index) {
  let notes = JSON.parse(localStorage.getItem('addnotes'));
  let archivedNote = notes.splice(index, 1)[0];
  localStorage.setItem('addnotes', JSON.stringify(notes));

  let archivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];
  archivedNotes.push(archivedNote);
  localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));

  showNotes();
}

// unarchive a note
function unarchiveNote (index) {
  let archivedNotes = JSON.parse(localStorage.getItem('archivedNotes'));
  let unarchivedNote = archivedNotes.splice(index, 1)[0];
  localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));

  let notes = JSON.parse(localStorage.getItem('addnotes')) || [];
  notes.push(unarchivedNote);
  localStorage.setItem('addnotes', JSON.stringify(notes));

  showNotes();
}



addButton.addEventListener('click', add) 

//navigation bar
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

//for closing the menu on clicking any nav link i.e home,about us etc

document.querySelectorAll(".nav-link")
.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))