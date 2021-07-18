
const showProcessing = (message = "Loading...") => {
    document.querySelector(".processing_screen .processing_text").innerText = message;

    document.querySelector(".processing_screen").style.display = "flex";

}
function hideProcessing(){
    document.querySelector(".processing_screen").style.display = "none";
}