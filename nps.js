document.body.innerHTML = "";
for(let i=1; i<=35 ;i++){
    if(i!= 29){
        let img = document.createElement("img");
        img.setAttribute("src", `http://nationalpublicschool.in/PrincepDeskimg/${i}.jpg`);
        document.body.append("img")
    }
}