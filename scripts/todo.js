let todos;

todos = getTodoFromLocalStorage();

function saveTodoToLocalStorage(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromLocalStorage(){
    return JSON.parse(localStorage.getItem("todos"))
}




const todosContainer = document.querySelector(".todos");

function renderTodo(){
    todosContainer.innerHTML = "";
    if(todos == null){
        const addTodo = document.createElement("div");
        addTodo.classList.add("add_todo");
        const html = `
                <input placeholder="Add new todo" type="text" name="" id="">
                <button onclick="addTodo()">Add Todo</button>
                `
        addTodo.innerHTML = html;
        todosContainer.appendChild(addTodo);
        return;
    }
    todos.map(todoitem => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo_item");
        const html = `
            <input type="checkbox" id=${todoitem.id} onchange=deleteTodo(this.id)>
            <p>${todoitem.todo}</p>
            `
        todoItem.innerHTML = html;
        todosContainer.appendChild(todoItem);
    })
    const addTodo = document.createElement("div");
    addTodo.classList.add("add_todo");
    const html = `
            <input placeholder="Add new todo" type="text" name="" id="new_todo_input">
            <button onclick="addTodo()">Add Todo</button>
            `
    addTodo.innerHTML = html;
    todosContainer.appendChild(addTodo)
}
renderTodo();




function addTodo(){
    const newTodo = document.querySelector(".add_todo input").value;
    if(newTodo){

        if(todos == null){
            todos = [];
        }
        todos.push({id : Math.random(), todo : newTodo});
        newTodo.value = "";
        saveTodoToLocalStorage();
        todos = getTodoFromLocalStorage();
        renderTodo();
    }
}

function deleteTodo(id){
    setTimeout(() => {
        let newTodoData = [];
        todos.map((todo)=>{
            if(todo.id != id){
                newTodoData.push(todo);
            }
        });
        todos = newTodoData;
        saveTodoToLocalStorage();
        todos = getTodoFromLocalStorage();
        renderTodo();
    }, 200);
    
}

const todoInput = document.querySelector(".add_todo #new_todo_input")

todoInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        addTodo();
    }
})
