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
    notesItemArray.map(item => {
        const itemContainer = document.createElement("div");
        itemContainer.setAttribute("id", `${item.id}`);
        const html = `
            <p class="note">${item.note}</p>
            <p class="note_name">${item.name}</p>
        `
        itemContainer.innerHTML = html;
        notesContainer.appendChild(itemContainer);
    })
}

renderNotes(notesItem);


