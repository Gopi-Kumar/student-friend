let routineItems = getRoutineFromLocalStorage();


function saveRoutineToLocalStorage(){
    localStorage.setItem("routine", JSON.stringify(routineItems));
}
function getRoutineFromLocalStorage(){
    return JSON.parse(localStorage.getItem("routine"))
}

const routineContainer = document.querySelector(".routine");
function renderRoutine(routineItemArray){
    if(routineItemArray == null || routineItemArray.length == 0 ){

        return;
    }

    routineContainer.innerHTML = "";
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
    let fromHr = document.getElementById("fromHr").value;
    let fromMin = document.getElementById("fromMin").value;
    let toHr = document.getElementById("toHr").value;
    let toMin = document.getElementById("toMin").value;
    let toMeridium = document.getElementById("toMeridium").value;
    let fromMeridium = document.getElementById("fromMeridium").value;
    let workName = document.getElementById("workNameInput").value;
    if(fromHr && fromHr <= 12 && fromMin && fromMin <= 59 && toHr && toHr <= 12 && toMin && toMin <= 59  && fromMeridium != null && toMeridium != null && workName){
        if(fromHr < 10){
            fromHr = `0${fromHr}`
        }
        if(fromMin < 10){
            fromMin = `0${fromMin}`;
        }
        if(toHr < 10){
            toHr = `0${toHr}`
        }
        if(toMin < 10){
            toMin = `0${toMin}`
        }
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
        if(routineItems == null){
            routineItems = [];
        }
        routineItems.push(data);

        saveRoutineToLocalStorage();
        routineItems = getRoutineFromLocalStorage();
        renderRoutine(routineItems);
    }else{
        alert("Fill all field correctly please.");
    }
    return;

    
}

function deleteRoutine(){
    localStorage.removeItem("routine");
    window.location.href = "/routine.html"
    // routineItems = getRoutineFromLocalStorage();
    // renderRoutine(routineItems);

}