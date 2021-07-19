let dropdown = document.getElementById("show_dropdown_menu");
let hideDropdown = document.getElementById("hide_dropdown_menu");
let navbar = document.querySelector(".header .navbar");
function showDropdownMenu(){
    hideDropdown.style.display = "block";
    dropdown.style.display = "none";
    navbar.style.display = "flex";
}
function hideDropdownMenu(){
    hideDropdown.style.display = "none";
    dropdown.style.display = "block";
    navbar.style.display = "none";
}