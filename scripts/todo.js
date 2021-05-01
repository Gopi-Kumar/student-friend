const todos = [
    {
        id : Math.random(),
        todo : "complete css clip path",
    },
    {
        id : Math.random(),
        todo : "MDN api",
    },
    {
        id : Math.random(),
        todo : "Laravel tutorial",
    },
    {
        id : Math.random(),
        todo : "Students friend project",
    }, 
]

const todosContainer = document.querySelector(".todos");


function renderTodo(){
    todosContainer.innerHTML = "";
    todos.map(todoitem => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo_item");
        const html = `
            <p>${todoitem.todo}</p>
            <button id=${todoitem.id}>X</button>`
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
        renderTodo();
    }
}