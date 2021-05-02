let routineItems = []


function saveRoutineToLocalStorage(){
    localStorage.setItem("routine", JSON.stringify(routineItems));
}
function getRoutineFromLocalStorage(){
    return JSON.parse(localStorage.getItem("routine"))
}

const routineContainer = document.querySelector(".routine");
function renderRoutine(routineItemArray){
    if(routineItemArray.length == 0){
        return;
    }
    routineContainer.innerHTML = "";
    if(routineItemArray == null)
        routineItemsArray = [{}];
    routineItemArray.map(item => {
        const itemContainer = document.createElement("section");
        itemContainer.classList.add("routine_item");
        const html = `
            <p class="from_time">${item.from.hr}:${item.from.min}&nbsp;${item.from.meridium}</p>
            <p class="to_time">${item.to.hr}:${item.to.min}&nbsp;${item.to.meridium}</p>
            <p class="work_name">${item.name}</p>
        `
        itemContainer.innerHTML = html;
        routineContainer.appendChild(itemContainer);

    })
}

renderRoutine(routineItems);


function addRoutine(){
    const fromHr = document.getElementById("fromHr").value;
    const fromMin = document.getElementById("fromMin").value;
    const toHr = document.getElementById("toHr").value;
    const toMin = document.getElementById("toMin").value;
    const toMeridium = document.getElementById("toMeridium").value;
    const fromMeridium = document.getElementById("fromMeridium").value;
    const workName = document.getElementById("workNameInput").value;
    console.log(fromHr, fromMin, toHr, toMin, toMeridium, fromMeridium, workName);
    let data = {
        id : Math.random(),
        from : {
            hr : fromHr,
            min : fromMin,
            meridium : fromMeridium
        },
        to : {
            hr : toHr,
            min : toMin,
            meridium : toMeridium
        }, 
        name : workName
    }
    
    routineItems.push(data);

    saveRoutineToLocalStorage();
    routineItems = getRoutineFromLocalStorage();
    renderRoutine(routineItems);

    
}