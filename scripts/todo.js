let todos;
function getTodosFromLocalStorage(){
    todos = JSON.parse(localStorage.getItem("todos"));
}
getTodosFromLocalStorage();

let currentSelectedListIndex = 0;
let previousSelectedList;
const todo_container = document.getElementById("todo_items");


function saveTodoToLocalStorage(){
    localStorage.setItem("todos",JSON.stringify(todos));
}
function renderTodo(){
    if(todos == null || todos.length == 0){
        todos = [{
            list_name : "Default",
            id: 0,
            todo_item : [],
            completed_item : [],
            
        }]
    }
    todo_container.innerHTML = "";
    todos.map(todo => {
       let list_name = todo.list_name;
       todo.todo_item.map(item => {
            let todo_item = document.createElement("div");
            todo_item.classList.add("todo_item");
            let html = `
                <div class="checkbox"  onclick="deleteTodo(this)">
                    <i class="fas fa-check-circle"></i>
                </div>
                <section>
                    <p>${item}</p>
                    <p>${list_name}</p>
                </section>
            `
            todo_item.innerHTML = html;
            todo_container.appendChild(todo_item)
        })
    })
}
function renderCompletedTodo(){
    todos.map(todo => {
        let list_name = todo.list_name;
        todo.completed_item.map(item => {
             let completed_item = document.createElement("div");
             completed_item.classList.add("completed_item");
             let html = `
                 <div class="checkbox">
                     <i class="fas fa-check-circle"></i>
                 </div>
                 <section>
                     <p>${item}</p>
                     <p>${list_name}</p>
                 </section>
             `
             completed_item.innerHTML = html;
             todo_container.appendChild(completed_item)
         })
     })
}

renderTodo();
renderCompletedTodo();

let list_container= document.getElementById("all_lists_container");
function renderList(){
    list_container.innerHTML = "";
    let allList = document.createElement("section");
    allList.setAttribute("id", "list_heading");
    allList.classList.add("active_list");
    let html = `
        <p class="all_list">All Lists</p>
    `
    allList.innerHTML = html;
    list_container.appendChild(allList);
    todos.map(todo => {
        let section = document.createElement("section");
        section.setAttribute("id", `${todo.id}`)
        section.classList.add("list");

        let html = `
            <p onclick="renderSpecificListTodos(this.parentNode.id,this)"><i class="fas fa-list"></i>${todo.list_name} <span>${todo.todo_item.length}</span> </p>
            <i class="fas fa-trash" onclick="deleteTodoList(this)"></i>
        `

        section.innerHTML = html;
        list_container.appendChild(section);
    })
    let clsection = document.createElement("section");
    clsection.innerText = "Create New List";
    clsection.setAttribute("onclick","createNewTodoList()");
    clsection.setAttribute("class","create_list")
    list_container.appendChild(clsection);
}
renderList();


function renderSpecificListTodos(listId,ele){
    if(ele != null){
        previousSelectedList.classList.remove("active_list");
        ele.parentNode.classList.add("active_list");
        previousSelectedList = ele.parentNode;
    }
    
    currentSelectedListIndex =listId;
    todo_container.innerHTML = "";
    todos[listId].todo_item.map(item => {
       let list_name = todos[listId].list_name;
            let todo_item = document.createElement("div");
            todo_item.classList.add("todo_item");
            let html = `
                <div class="checkbox" onclick="deleteTodo(this)">
                    <i class="fas fa-check-circle"></i>
                </div>
                <section>
                    <p>${item}</p>
                    <p>${list_name}</p>
                </section>
            `
            todo_item.innerHTML = html;
            todo_container.appendChild(todo_item)
    })
    todos[listId].completed_item.map(item => {
        let list_name = todos[listId].list_name;
             let todo_item = document.createElement("div");
             todo_item.classList.add("completed_item");
             let html = `
                 <div class="checkbox">
                     <i class="fas fa-check-circle"></i>
                 </div>
                 <section>
                     <p>${item}</p>
                     <p>${list_name}</p>
                 </section>
             `
             todo_item.innerHTML = html;
             todo_container.appendChild(todo_item)
     })
}
previousSelectedList = document.getElementById("list_heading");

//new todo 

let newTodoInput = document.querySelector("#todo_input");
function addNewTodo(){
   if(newTodoInput.value != ""){
    todos[currentSelectedListIndex].todo_item.push(newTodoInput.value);
    renderSpecificListTodos(currentSelectedListIndex);
    renderList();
    saveTodoToLocalStorage();
   }
}

function  deleteTodo(args){
    args.children[0].style.display = "block";
    setTimeout(() => {
        let section = args.nextSibling.nextSibling;
        let list_name = section.children[1].innerText;
        let todo_item_name =  section.children[0].innerText;
    
        todos.map(todo => {
            if(todo.list_name == list_name){
                currentSelectedListIndex = todo.id;
                return;
            }
        })
        let removeItemFrom = todos[currentSelectedListIndex].todo_item;
        let newTodoArray = []; 
        removeItemFrom.map(item => {
            if(item != todo_item_name)
                newTodoArray.push(item);
        })
        todos[currentSelectedListIndex].todo_item = newTodoArray;
        todos[currentSelectedListIndex].completed_item.push(todo_item_name)
    
        renderSpecificListTodos(currentSelectedListIndex);
        saveTodoToLocalStorage();
    }, 200);
}

//new todo list
let newTodoList = document.querySelector(".new_todo_input_form")
function createNewTodoList(){
   newTodoList.style.display = "flex";
}

function closeListInput(){
    newTodoList.style.display = "none";
}

function saveTodoList(){
    console.log(todos.length)
    let listName = document.querySelector(".new_todo_input_form #new_todo_input").value;
    if(listName != ""){
        currentSelectedListIndex = todos.length;
        let newTodo = {
            list_name : listName,
            id:todos.length,
            todo_item : [],
            completed_item : [],
        }
        todos.push(newTodo);
        console.log(todos)
        renderList();
        renderSpecificListTodos(currentSelectedListIndex);
    }
    saveTodoToLocalStorage();
    closeListInput();
}

function deleteTodoList(args) {
    
    let listIndextoRemove = args.parentNode.id;
    if(listIndextoRemove == (todos.length - 1)){
        todos.pop();
    }else{
        for(let i=Number(listIndextoRemove); i<(todos.length - 1); i++){
            todos[i+1].id--;
            todos[i] = todos[i+1];
        }
        todos.pop();
    }
    saveTodoToLocalStorage();
    renderList();
    renderTodo();
}

//list dropdown;
let listOpened = false;
function showAllList(){
    let dropdownButton =  document.querySelector(".todo_header i");
    let todoNavbar =  document.getElementById("todo_navbar");
    if(!listOpened){
        dropdownButton.classList.remove("fa-bars");
        dropdownButton.classList.add("fa-window-close");
        todoNavbar.style.display = "block";
        listOpened = true;
        return;
    }
    dropdownButton.classList.add("fa-bars");
    dropdownButton.classList.remove("fa-window-close");
    todoNavbar.style.display = "none";
    listOpened = false;
    return;
}