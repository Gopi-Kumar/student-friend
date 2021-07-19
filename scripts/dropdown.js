let dropdown = document.getElementById("show_dropdown_menu");
let navbar = document.querySelector(".header .navbar");
function showDropdownMenu(){
    dropdown.style.display = "none";
    navbar.style.display = "flex";
}
function hideDropdownMenu(){
    dropdown.style.display = "block";
    navbar.style.display = "none";
}