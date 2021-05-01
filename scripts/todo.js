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
    todos.map(todoitem => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo_item");
        const html = `
            <p>${todoitem.todo}</p>
            <button id=${todoitem.id} onclick=deleteTodo(this.id)>X</button>`
        todoItem.innerHTML = html;
        todosContainer.appendChild(todoItem);
    })
}
renderTodo();






function addTodo(){
    const newTodo = document.querySelector(".add_todo input").value;
    if(newTodo){
        todos.push({id : Math.random(), todo : newTodo});
        newTodo.value = "";
        saveTodoToLocalStorage();
        todos = getTodoFromLocalStorage();
        renderTodo();
    }
}

function deleteTodo(id){
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
}