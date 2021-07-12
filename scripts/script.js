
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


//login

let userLoggedIn = false;
document.querySelector("#login-form .form #submit-button").onclick=()=>{
    let username = document.querySelector("#login-form .form #username").value,
     password = document.querySelector("#login-form .form #password").value;
    if(!username || !password){
        showNotification("fill username and password");
        return;
    }else{
        fetch(`http://localhost:3001/login/${username}/${password}`, {
            method : 'POST', 
        }).then(res => res.json()).then(res => {
            if(res.message){
                showNotification(res.message);
            }else{
                saveCloudDataToLocalStorage(res);
            }
        });
    }
}

//create new user
document.querySelector("#login-form .form #submit-button").onclick=()=>{
    let username = document.querySelector("#login-form .form #username").value,
     password = document.querySelector("#login-form .form #password").value;
    if(!username || !password){
        showNotification("fill username and password");
        return;
    }else{
        fetch(`http://localhost:3001/login/${username}/${password}`, {
            method : 'POST', 
        }).then(res => res.json()).then(res => {
            if(res.message){
                showNotification(res.message);
            }else{
                saveCloudDataToLocalStorage(res);
            }
        });
    }
}
//create new user

document.querySelector("#new-user-form .form #submit-button").onclick=()=>{
    let username = document.querySelector("#new-user-form .form #username").value,
    password = document.querySelector("#new-user-form .form #password").value;
    confirm_password = document.querySelector("#new-user-form .form #password").value;

    if(!username || !password || !confirm_password){
        showNotification("Fill All fields");
        return;
    }else if(password !== confirm_password){
        showNotification("Password not matced");
        return;
    }else{
        fetch(`http://localhost:3001/newuser/${username}/${password}`, {
            method : 'POST', 
        }).then(res => res.json()).then(res => {
            if(res.message){
                showNotification(res.message);
            }else{
                showNotification("Account Created...");
                closeCreateNewUserForm();
                // uploadLocalDataToCloud();
            }
        });
    }
}
//upload

//logout


