const services = [
    {
        thumbnail : "alarm-clock.png",
        name : "Alarm",
        href : "/components/alarm/index.html"
    },
    {
        thumbnail : "checklists.png",
        name : "Todo",
        href : "/components/alarm/index.html"
    },
    {
        thumbnail : "pencil.png",
        name : "Notes",
        href : "/components/alarm/index.html"
    },
    {
        thumbnail : "time-management.png",
        name : "Routine",
        href : "/components/alarm/index.htmlne"
    },
    {
        thumbnail : "books.png",
        name : "Books",
        href : "/s/alarm/index.html"
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


