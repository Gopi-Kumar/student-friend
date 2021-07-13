
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

function showLogOutAndUploadButton(){
    document.querySelector("#login").style.display = "none";
    document.querySelector("#newuser").style.display = "none";
    document.querySelector("#upload").style.display = "flex";
    document.querySelector("#logout").style.display = "flex";
}
function hideLogOutAndUploadButton(){
    document.querySelector("#login").style.display = "flex";
    document.querySelector("#newuser").style.display = "flex";
    document.querySelector("#upload").style.display = "none";
    document.querySelector("#logout").style.display = "none";
}


function saveCloudDataToLocalStorage(res){
    console.log(JSON.parse(res.notes));
    localStorage.setItem("notes", JSON.parse(res.notes));
    localStorage.setItem("todos", JSON.parse(res.todos));
    localStorage.setItem("alarms", JSON.parse(res.alarms));
    localStorage.setItem("routine", JSON.parse(res.routine));
    localStorage.setItem("webpage", JSON.parse(res.webbooks));
}

function showHiName(name){
    document.querySelector("body .home_header section .logo").innerText = `${name}`
}



//login
const login = (username ,password) => {
    fetch(`http://localhost:3001/login/${username}/${password}`, {
        method : 'POST', 
    }).then(res => res.json()).then(res => {
        if(res.message){
            showNotification(res.message);
        }else{
            localStorage.setItem("userlogged", "true");
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            closeLoginForm();
            saveCloudDataToLocalStorage(res);
            showLogOutAndUploadButton();
            showHiName(`Hi,${username}`);
            JSON.parse(JSON.parse(localStorage.getItem("notes"))[0])
          
        }
    });
}
document.querySelector("#login-form .form #submit-button").onclick=()=>{
    let username = document.querySelector("#login-form .form #username").value,
     password = document.querySelector("#login-form .form #password").value;
    if(!username || !password){
        showNotification("fill username and password");
        return;
    }else{
        login(username,password);
        closeLoginForm();
    }
}


//create new user
document.querySelector("#new-user-form .form #submit-button").onclick=()=>{
    let username = document.querySelector("#new-user-form .form #username").value,
    password = document.querySelector("#new-user-form .form #password").value;
    confirm_password = document.querySelector("#new-user-form .form .confirm_password").value;

    if(!username || !password || !confirm_password){
        showNotification("Fill All fields");
        return;
    }
    if(password != confirm_password){
        console.log("password matching");
        showNotification("Password not matced");
        return;
    }

    fetch(`http://localhost:3001/newuser/${username}/${password}`, {
        method : 'POST', 
    }).then(res => res.json()).then(res => {
        if(res.message){
            showNotification(res.message);
        }else{
            closeCreateNewUserForm();
            showNotification("Account Created...");
            localStorage.setItem("username",username);
            localStorage.setItem("password", password);
            upload();
            login(username,password);
            

        }
    });
    
}
//upload

function upload(){
    let username = localStorage.getItem("username"),
    password = localStorage.getItem("password"),
    notes = localStorage.getItem("notes"),
    todos = localStorage.getItem("todos"),
    alarms = localStorage.getItem("alarms"),
    routine = localStorage.getItem("routine"),
    webpage = localStorage.getItem("webpage");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username" : username, 
        "password" : password,
        "notes" : notes,
        "alarms" : alarms,
        "routine" : routine,
        "webpage" : webpage,
        "todos" : todos,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3001/upload", requestOptions)
    .then(response => response.text())
    .then(result => {
        if(result.message){
            showNotification(res.message);
        }
        showNotification("Uploaded");
    })
    .catch(error => {
        showNotification("Something Went Wrong");
    });
}

//logout
function logout(){
    localStorage.setItem("userlogged", "false");
    hideLogOutAndUploadButton();
    showHiName("Student Friend");
    localStorage.removeItem("notes");
    localStorage.removeItem("todos");
    localStorage.removeItem("alarms");
    localStorage.removeItem("routine");
    localStorage.removeItem("webpage");
   
}




//if user logged before
if(localStorage.getItem("userlogged") == "true"){
    console.log("Hello")
    showLogOutAndUploadButton();
    showHiName(localStorage.getItem("username"));
}


