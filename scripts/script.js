const showNotification = (message, color) => {
    document.querySelector(".notifications").innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("notification");
    // div.style.backgroundColor = color;
    let html = `<p>${message}</p><button onclick="closeNotification()">Ok</button>`
    div.innerHTML= html;
    document.querySelector(".notifications").appendChild(div)


}
const services = [
    {
        thumbnail : "alarm-clock.png",
        name : "Alarm",
        href : "alarm.html"
    },
    {
        thumbnail : "checklists.png",
        name : "Todo",
        href : "todo.html"
    },
    {
        thumbnail : "pencil.png",
        name : "Notes",
        href : "notes.html"
    },
    {
        thumbnail : "time-management.png",
        name : "Routine",
        href : "routine.html"
    },
    {
        thumbnail : "webbook.png",
        name : "Web Book",
        href : "webbook.html"
    }

]

// Render Services
const services_div = document.querySelector(".services");
services.forEach(service => {
    const service_item = document.createElement("div");
    service_item.classList.add("service");
    const html = `
                    <img src="./images/${service.thumbnail}" class="thumbnail">
                    <a class="name" href=${service.href}>${service.name}</a>
                `
    service_item.innerHTML = html;
    services_div.appendChild(service_item)
})


let loginForm = document.querySelector("#login-form");
let newUserFrom = document.querySelector("#new-user-form");
function showLoginForm(){
    loginForm.style.display = "flex";
}
function showCreateNewUserForm(){
    newUserFrom.style.display = "flex";
}
function closeLoginForm(){
    loginForm.style.display = "none";
}
function closeCreateNewUserForm(){
    newUserFrom.style.display = "none";
}
function closeNotification(){
    document.querySelector(".notification").style.display = "none";
}

//login

let userLoggedIn = false;

//create new user

//upload


