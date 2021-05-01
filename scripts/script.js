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
        href : "alarm.html"
    },
    {
        thumbnail : "time-management.png",
        name : "Routine",
        href : "alarm.htmlne"
    },
    {
        thumbnail : "books.png",
        name : "Books",
        href : "alarm.html"
    },
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


