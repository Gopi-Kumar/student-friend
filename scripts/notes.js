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

function showNotes(note, title){
    disableScroll();
    let show_note_container = document.querySelector(".show_note");
    show_note_container.style.display = "flex"
    let html = `
        <section>
            <p>${title}</p>
            <button onclick="closeShowingNote()">x</button>
        </section>
        <section>
            <p>${note}</p>
        </section>
    `
    show_note_container.innerHTML = html;
}
function closeShowingNote(){
    enableScroll();
    document.querySelector(".show_note").style.display = "none"
}



const notesContainer = document.querySelector(".notes");
function renderNotes(notesItemArray){
    if(notesItemArray == null || notesItemArray.length == 0){
        notesContainer.innerHTML = "<h1 style='color: gray;'>No Notes 🙄</h1><button onClick='addNewNote()'>Add some notes</button>"
        notesItemArray = [];
        return;
    }

    notesContainer.innerHtml = "";
    console.log("rendered")
    notesItemArray.map(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("note_container")
        itemContainer.setAttribute("id", `${item.id}`);
        itemContainer.setAttribute("title", "Double click to open");
        itemContainer.addEventListener("dblclick", ()=>{
            showNotes(item.note,item.name);
        })
        const html = `
            <section class="title">
                <p class="note_name">${item.name}</p>
                <div class="option" onclick="showOptions(this)">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="options">
                    <button onclick="closeOptions()">x</button>
                    <p onclick="editNote()">Edit</p>
                    <p onclick="deleteNote()">Delete</p>                
                </div>
            </section>
            <p class="note"">${item.note}</p>
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

function clearInputField(){
    noteTextArea.value = "Write your note here..";
    noteNameInput.value = "";
}

function disableScroll(){
    document.body.style.overflow = "hidden";
}
function enableScroll(){
    document.body.style.overflow = "scroll";
}
function addNewNote(){
    newNoteForm.style.display = "block";
    disableScroll();
}
function closeNotesEditing(){
    newNoteForm.style.display = "none";
    enableScroll();
}
function saveNote(){
    enableScroll();
    let noteText = document.querySelector("textarea").value;
    let note_name = document.querySelector("#note_name").value;
    if(noteText == "" || note_name == ""){
        showNotification("Fill All field");
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
    deleteNote();
    saveNotesToLocalStorage();
    notesItem = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    clearInputField();
    renderNotes(notesItem);
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
    location.reload();
}


function editNote(){
    disableScroll();
    newNoteForm.style.display = "block";
    let cancelButton = document.querySelectorAll(".save_and_cancel button")[0];
    cancelButton.innerHTML = "Delete";
    cancelButton.style.backgroundColor = "red";
    cancelButton.addEventListener("click", ()=>{
        deleteNote();
    })
    // deleteNote();
    notesItem.map(note => {
        if(note.id == currentNoteId){
            noteTextArea.value = note.note;
            noteNameInput.value= note.name;
        }
    })
  
    
    
    if(optionsOpened){
        closeOptions();
    }
}

// window.addEventListener("click", ()=>{
//     if(optionsOpened){
//         closeOptions();
//     }
// })
