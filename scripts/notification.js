const showNotification = (message, color) => {
    document.querySelector(".notifications").innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("notification");
    // div.style.backgroundColor = color;
    let html = `<p>${message}</p><button onclick="closeNotification()">Ok</button>`
    div.innerHTML= html;
    document.querySelector(".notifications").appendChild(div)
}
function closeNotification(){
    document.querySelector(".notification").style.display = "none";
}