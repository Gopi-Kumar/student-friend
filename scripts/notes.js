let notesItem = getNotesFromLocalStorage();

function saveNotesToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notesItem));
}

function getNotesFromLocalStorage(){
    return JSON.parse(localStorage.getItem("notes"));
}

function getRandomId(){
    return `id_${Math.floor(Math.random() * 10000000)}`;
}

const notesContainer = document.querySelector(".notes");
function renderNotes(notesItemArray){
    if(notesItemArray == null || notesItemArray.length == 0){
        return;
    }

    notesContainer.innerHtml = "";
    console.log("rendered")
    notesItemArray.map(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("note_container")
        itemContainer.setAttribute("id", `${item.id}`);
        itemContainer.setAttribute("title", "Click to open")
        const html = `
            <section class="title">
                <p class="note_name">${item.name}</p>
                <div class="option" onclick="showOptions(this)">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="options">
                    <p onclick="editNote()">Edit</p>
                    <p onclick="deleteNote()">Delete</p>                
                </div>
            </section>
            <p class="note">${item.note}</p>
        `
        itemContainer.innerHTML = html;
        notesContainer.appendChild(itemContainer);
    })
}

renderNotes(notesItem);

const newNoteForm = document.querySelector(".notes_editing");
const options = document.querySelector(".options");
const option = document.querySelector(".option");

let noteTextArea = document.querySelector("textarea");
let noteNameInput = document.querySelector("#note_name");

function addNewNote(){
    newNoteForm.style.display = "block";
}
function closeNotesEditing(){
    newNoteForm.style.display = "none";
}
function saveNote(){
    let noteText = document.querySelector("textarea").value;
    let note_name = document.querySelector("#note_name").value;
    if(noteText == "" || note_name == ""){
        return;
    }
    if(notesItem == null){
        notesItem = [];
    }

    notesItem.push({
        id : getRandomId(),
        name : note_name,
        note : noteText
    });
    saveNotesToLocalStorage();
    notesItem = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    renderNotes(notesItem);
    noteText = "Write your note here...";
    note_name = "";
    closeNotesEditing();
}

let currentNoteId, optionsOpened = false;

function showOptions(ele){
    if(optionsOpened){
        closeOptions(); 
    }
    optionsOpened = true;
    currentNoteId = ele.parentNode.parentNode.id;
    document.querySelector(`#${currentNoteId} .title .options`).style.display = "flex"
}

function closeOptions(){
    document.querySelector(`#${currentNoteId} .title .options`).style.display = "none";
    optionsOpened = false;
}


function deleteNote(){
    optionsOpened = false;
    let newNotesData = [];
    notesItem.map(note => {
        if(note.id != currentNoteId){
            newNotesData.push(note);
        }
    })
    notesItem = newNotesData;
    saveNotesToLocalStorage();
    notesItem = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    renderNotes(notesItem);
}

function editNote(){
    newNoteForm.style.display = "block";
    let cancelButton = document.querySelectorAll(".save_and_cancel button")[0];
    cancelButton.innerHTML = "Delete";
    cancelButton.style.backgroundColor = "red";
    cancelButton.addEventListener("click", ()=>{
        deleteNote();
    })
    notesItem.map(note => {
        if(note.id == currentNoteId){
            noteTextArea.value = note.note;
            noteNameInput.value= note.name;
        }
    })
    
    deleteNote();
    
    if(optionsOpened){
        closeOptions();
    }
}

// window.addEventListener("click", ()=>{
//     if(optionsOpened){
//         closeOptions();
//     }
// })
