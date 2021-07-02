console.log("Hello")
let webPages = getWebPagesFromLocalStorage();

function saveWebPagesToLocalStorage(){
    localStorage.setItem("webpage", JSON.stringify(webPages));
}

function getWebPagesFromLocalStorage(){
    return JSON.parse(localStorage.getItem("webpage"));
}

function getRandomId(){
    return `id_${Math.floor(Math.random() * 10000000)}`;
}

const webPagesContainer = document.querySelector(".webpages");
function renderWebPages(webPagesArray){
    if(webPagesArray == null || webPagesArray.length == 0){
        return;
    }

    webPagesContainer.innerHtml = "";
    webPagesArray.map(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("webpage")
        itemContainer.setAttribute("id", `${item.id}`);
        itemContainer.setAttribute("title", "Click to open")
        const html = `
            <a href="${item.href}"><p>${item.name}</p></a>
        `
        itemContainer.innerHTML = html;
        console.log(itemContainer)
        webPagesContainer.appendChild(itemContainer);

    })
}

renderWebPages(webPages);

const newWebPageForm = document.querySelector(".notes_editing");
const options = document.querySelector(".options");
const option = document.querySelector(".option");

let noteTextArea = document.querySelector("textarea");
let noteNameInput = document.querySelector("#note_name");

function clearInputField(){
    noteTextArea.value = "Write your note here..";
    noteNameInput.value = "";
}

function addNewWebPage(){
    newWebPageForm.style.display = "block";
}
function closeWebPageEditing(){
    newWebPageForm.style.display = "none";
}
function saveWebPage(){
    let webpageName = document.querySelector("#webPageName").value;
    let webPageUrl = document.querySelector("#webPageUrl").value;
    if(webpageName == "" || webPageUrl == ""){
        return;
    }
    if(webPages == null){
        webPages = [];
    }

    webPages.push({
        id : getRandomId(),
        href : webPageUrl,
        name : webpageName
    });
    saveWebPagesToLocalStorage();
    webPages = getWebPagesFromLocalStorage();
    webPagesContainer.innerHTML = "";
    clearInputField();
    renderWebPages(webPages);
    closeWebPageEditing();
}

// let currentNoteId, optionsOpened = false;

// function showOptions(ele){
//     if(optionsOpened){
//         closeOptions(); 
//     }
//     optionsOpened = true;
//     currentNoteId = ele.parentNode.parentNode.id;
//     document.querySelector(`#${currentNoteId} .title .options`).style.display = "flex"
// }

// function closeOptions(){
//     document.querySelector(`#${currentNoteId} .title .options`).style.display = "none";
//     optionsOpened = false;
// }


// function deleteNote(){
//     optionsOpened = false;
//     let newNotesData = [];
//     webPages.map(note => {
//         if(note.id != currentNoteId){
//             newNotesData.push(note);
//         }
//     })
//     webPages = newNotesData;
//     saveWebPagesToLocalStorage();
//     webPages = getWebPagesFromLocalStorage();
//     webPagesContainer.innerHTML = "";
//     renderWebPages(webPages);
// }

// function editNote(){
//     newWebPageForm.style.display = "block";
//     let cancelButton = document.querySelectorAll(".save_and_cancel button")[0];
//     cancelButton.innerHTML = "Delete";
//     cancelButton.style.backgroundColor = "red";
//     cancelButton.addEventListener("click", ()=>{
//         deleteNote();
//     })
//     webPages.map(note => {
//         if(note.id == currentNoteId){
//             noteTextArea.value = note.note;
//             noteNameInput.value= note.name;
//         }
//     })
    
//     deleteNote();
    
//     if(optionsOpened){
//         closeOptions();
//     }
// }

