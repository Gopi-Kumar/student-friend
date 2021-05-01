const chr = document.querySelector("#chr");
const cmin = document.querySelector("#cmin");
const csec = document.querySelector("#csec");
const addAlarmButton = document.querySelector(".add__alarm");
const alarmAddForm = document.querySelector(".add__alarm__form");
const meridiem = document.querySelector(".meridiem");
const alarms = document.querySelector(".alarms");
const overlay = document.querySelector(".overlay");
const alarmTone = document.querySelector('audio');
const alarmStarted = document.querySelector(".alarm_started");
// const deleteAlarm = document.getElementsByClassName("delete__alarm");

let AlarmId = 1;
let alarmData = getAlarmFromLocalStorage()

function saveAlarmToLocalStorage(){
    localStorage.setItem("alarms" , JSON.stringify(alarmData));
}
function getAlarmFromLocalStorage(){
    return JSON.parse(localStorage.getItem("alarms"))
}

renderAlarmData();

//rendering all alarm from alarmData
function renderAlarmData(){
    alarms.innerHTML = "";
    alarmData.map(alarm => {
        renderAlarms(alarm.id, alarm.hr, alarm.min, alarm.meridium);
    })
}
 

//rendering alarm from alarmdata
function renderAlarms(id, hr, min, meridiem) {
    const alarmItem = document.createElement('div');
    alarmItem.setAttribute("class", "alarm__item");
    const htmlForAlarm = `
                            <div class="timer">
                                <div class="square">
                                    <div class="digits" id="chr">${hr}</div>
                                    <div class="text"> : </div>
                                </div>
                                <div class="square">
                                    <div class="digits" id="cmin">${min}</div>
                                </div>
                                <div class="square">
                                    <div class="digits" id="meridiem">${meridiem}</div>
                                </div>
                            </div>
                            <div onClick=deleteAlarm(this.id) class="delete__alarm" id="${id}">
                                X
                            </div>
                        `
    alarmItem.innerHTML = htmlForAlarm;
    alarms.appendChild(alarmItem);
}


//close alarm
function closeAlarm(){
    hideOverlay();
    alarmTone.pause();
    alarmStarted.style.display = "none";
}

//start alarm
function startAlarm(hr,min,meri){
    showOverlay();
    alarmTone.play();
    document.querySelector(".time #hr").innerText = hr;
    document.querySelector(".time #min").innerText = min;
    document.querySelector(".time #mer").innerText = meri;
    alarmStarted.style.display = "flex";
}
//delete__alarm
function deleteAlarm(id){
    let newAlarmData = [];
    alarmData.map((alarm)=>{
        if(alarm.id != id){
            newAlarmData.push(alarm);
        }
    });
    alarmData = newAlarmData;
    saveAlarmToLocalStorage();
    alarmData = getAlarmFromLocalStorage();
    renderAlarmData(alarmData);
}
//close form function 
function closeForm() {
    alarmAddForm.style.display = "none";
    hideOverlay();
}


//this function after alarm form summited
function addAlarm() {
    console.log("alarm added");
    let alarmHr = document.querySelector(".input__field #hr").value;
    let alarmMin = document.querySelector(".input__field #min").value;
    let alarmMeridium = document.querySelector("select").value.toUpperCase();
    if(alarmHr && alarmMin && alarmMeridium && alarmMin.length < 3){
        if(alarmHr <= 12 && alarmHr != 0 && alarmMin <60  && alarmMeridium){
            if(alarmHr < 10)
            {
                alarmHr = `0${alarmHr}`
            }
            if(alarmMin < 10 && alarmMin != "00"){
                alarmMin = `0${alarmMin}`;
            }
            AlarmId++;
            let data = {
                id : AlarmId,
                hr : alarmHr,
                min: alarmMin,
                meridium : alarmMeridium
            }
        
            alarmData.push(data);
            saveAlarmToLocalStorage();
            alarmData = getAlarmFromLocalStorage();
            renderAlarmData();
            closeForm();
            hideOverlay();
        }
    }

    

}

//this overlay is for add alarm form and alarm
function showOverlay(){
    overlay.style.display = "block";
}
function hideOverlay(){
    overlay.style.display = "none";
}


//this function updting clock time
function updateClock() {
    //clock functionallity
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let meri;
    if (hr > 12) {
        hr = hr - 12;
        meridiem.innerText = "PM"
        meri = "PM"
    } else {
        meridiem.innerText = "AM"
        meri = "AM"
    }
    sec = sec < 10 ? `0${sec}` : sec;
    hr = hr < 10 ? `0${hr}` : hr;
    min = min < 10 ? `0${min}` : min;
    chr.innerText = hr;
    cmin.innerText = min;
    csec.innerText = sec;

    //alarm functionallity
    alarmData.map(alarm => {
        if(alarm.hr == hr && alarm.min == min && alarm.meridium == meri && sec == 1){
           startAlarm(hr, min, meri);
        }
    })

    
}

setInterval(updateClock, 1000);

addAlarmButton.addEventListener("click", () => {
    showOverlay();
    alarmAddForm.style.display = "block";
})