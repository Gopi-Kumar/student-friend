let notesItem = getNotesFromLocalStorage();

function saveNotesToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notesItem));
}

function getNotesFromLocalStorage(){
    return JSON.parse(localStorage.getItem("notes"));
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
                <div class="option">
                    <div></div>
                    <div></div>
                    <div></div>
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


function addNewNote(){
    newNoteForm.style.display = "block";
}
function closeNotesEditing(){
    newNoteForm.style.display = "none";
}
function saveNote(){
    const noteText = document.querySelector("textarea").value;
    const note_name = document.querySelector("#note_name").value;
    if(noteText == "" || note_name == ""){
        return;
    }
    if(notesItem == null){
        notesItem = [];
    }

    notesItem.push({
        id : Math.random(),
        name : note_name,
        note : noteText
    });
    saveNotesToLocalStorage();
    notesItem = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    renderNotes(notesItem);
    closeNotesEditing();
}

