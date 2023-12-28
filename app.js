const todocontainer = document.getElementById("List")

const input = document.getElementById("input")
const array = []

async function displaytodo() {
    const todoapiresult = await fetch('https://dummyjson.com/todos');
    const data = await todoapiresult.json()

    const tododata = data.todos

    for (let todos of tododata) {
        const listitems = document.createElement("ul")
        listitems.classList.add("items")
        listitems.id = todos.id

        const newlist = document.createElement("li")
        newlist.classList.add("newitems")
        newlist.textContent = todos.todo

        listitems.appendChild(newlist)

        let deleteicon = document.createElement("i");
        deleteicon.className = "fa-solid fa-trash";
        deleteicon.classList.add("delete")
        listitems.appendChild(deleteicon);

        let editicon = document.createElement("span")
        editicon.className = "material-symbols-outlined";
        editicon.textContent = "edit";
        listitems.appendChild(editicon);

        deleteicon.addEventListener("click", () => {
            deletetodoitem(listitems.id)
            deleteItemFromList(listitems.textContent)
        })

        editicon.addEventListener("click", () => {
            editValueOfList(newlist.textContent, listitems.id)
        })

        todocontainer.appendChild(listitems)
        array.push(todos.todo)
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

async function addNewTodoList() {
    if (input.value === "") {
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

async function deletetodoitem(todoid) {
    const deleteitem = await fetch(`https://dummyjson.com/todos/${todoid}`, {
        method: 'DELETE',
    })
    return await deleteitem.json()
}

async function deleteItemFromList(todoitem) {
    const listvalue = document.getElementsByClassName("items");

    for (let item of listvalue) {
        if (item.textContent === todoitem) {
            item.remove();
        }
    }
}

async function editValueOfList(value,id) {
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")
    document.body.append(overlay)

    const popup = document.createElement("div")
    popup.classList.add("popup")
    document.body.append(popup)

    const popupInputField = document.createElement("input")
    popupInputField.classList.add("popupinput")
    popupInputField.type = "text"
    popupInputField.value = value
    popup.appendChild(popupInputField)

    const popupsavebutton = document.createElement("button")
    popupsavebutton.classList.add("btn")
    popupsavebutton.type = "submit"
    popupsavebutton.textContent = "save"
    popup.appendChild(popupsavebutton)

    popupsavebutton.addEventListener("click",async()=>{
        const newvalue = popupInputField.value
        const addNewValue = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo:newvalue
            })
        })
        const listvalue = document.getElementsByClassName("newitems");
        for(let i of listvalue){
            if(i.textContent===value){
                i.textContent=newvalue
            }
        }
        
        overlay.style.opacity = 0;
        overlay.style.display = "none";
        popup.style.display = "none"
        return await addNewValue.json()
        
        
    })
}

displaytodo()