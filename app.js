const todocontainer = document.getElementById("List")

const input = document.getElementById("input")

async function displaytodo() {
    const todoapiresult = await fetch('https://dummyjson.com/todos');
    const data = await todoapiresult.json()

    const tododata = data.todos

    for (let todos of tododata) {
        const listitems = document.createElement("li")
        listitems.classList.add("items")
        listitems.textContent = todos.todo

        let deleteicon = document.createElement("i");
        deleteicon.className = "fa-solid fa-trash";
        deleteicon.classList.add("delete")
        listitems.appendChild(deleteicon);


        todocontainer.appendChild(listitems)
    }

}

async function addNewTodo() {
    const newapiresponse = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: input.value,
            completed: false,
            userId: 5,
        })
    })
    return await newapiresponse.json()
}

async function addNewTodoList(){
    if(input.value=== ""){
       return null;
    }
    const response = await addNewTodo()
    const data = response.todo
    
    const NewTodoListItems = document.createElement("li")
    NewTodoListItems.classList.add("newlist")
    NewTodoListItems.textContent = data
    
    todocontainer.insertBefore(NewTodoListItems, todocontainer.firstChild)
    input.value = ""

}

displaytodo()