let webPages;
webPages = getWebPagesFromLocalStorage();

function saveWebPagesToLocalStorage(){
    localStorage.setItem("webpage", JSON.stringify(webPages));
}

function getWebPagesFromLocalStorage(){
    return JSON.parse(localStorage.getItem("webpage"));
}

function getRandomId(){
    return `id_${Math.floor(Math.random() * 10000000)}`;
}

function rcc(){
    return Math.ceil(Math.random() * 255);
}

function renderAddButton(){
    const addButton = document.createElement("div");
    addButton.classList.add("webpage")
    addButton.setAttribute("id", "addButton");
    addButton.addEventListener("click", ()=>{
        addNewWebPage();
    })
    const html = `
        <section title="Add new Webpage">
        <button>+</button>
        <p>Add New Url</p>
        </section>
    `
    addButton.innerHTML = html;
    webPagesContainer.appendChild(addButton);
}

const webPagesContainer = document.querySelector(".webpages");
function renderWebPages(webPagesArray){
    if(webPagesArray == null || webPagesArray.length == 0){
        renderAddButton();
        return;
    }

    webPagesContainer.innerHtml = "";
    webPagesArray.map(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("webpage");
        itemContainer.style.backgroundColor = `rgb(${rcc()}, ${rcc()}, ${rcc()})`
        itemContainer.setAttribute("id", `${item.id}`);
        itemContainer.setAttribute("title", "Click to open")
        const html = `
            <i onclick="deleteWebPage(this)" title="Delete this webpage" >
                x
            </i>
            <a href="${item.href}" target="blank"><p>${item.name}</p></a>
        `
        itemContainer.innerHTML = html;
        webPagesContainer.appendChild(itemContainer);

    })
    renderAddButton();
    

}

renderWebPages(webPages);





const newWebPageForm = document.querySelector(".webpage_editing");


let webPageNameArea = document.querySelector("#webPageName");
let webPageUrl = document.querySelector("#webPageUrl");

function clearInputField(){
    webPageNameArea.value = "";
    webPageUrl.value = "";
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
        showNotification("Fill all field correctly");
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

function saveWebPageOnEnterPress(e){
    if(e.key === "Enter"){
        saveWebPage();
        return;
    }
}

// function deleteWebPage(arg){
//     let id = arg.parentNode.id;
//     let webpages = getWebPagesFromLocalStorage();
//     webPages = webpages.filter(wp => wp.id != id);
//     console.log(webPages)
//     saveWebPagesToLocalStorage();
//     renderWebPages(webPages);

// }
function deleteWebPage(arg){
    const id = arg.parentNode.id;
    let newWebpages = [];
    webPages.map((wp)=>{
        if(wp.id != id){
            newWebpages.push(wp);
        }
    });
    webPages = newWebpages;
    saveWebPagesToLocalStorage();
    webPages = getWebPagesFromLocalStorage();
    renderWebPages(webPages);
}

document.querySelector("#webPageUrl").addEventListener("keypress", (e)=>{
   saveWebPageOnEnterPress(e);
})
document.querySelector("#webPageName").addEventListener("keypress", (e)=>{
    saveWebPageOnEnterPress(e);
 })
 