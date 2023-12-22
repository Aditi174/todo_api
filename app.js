const container = document.getElementById("List")

const input = document.getElementById("input")

async function display() {
    const result = await fetch('https://dummyjson.com/todos');
    const data = await result.json()
    console.log(data)

    const tododata = data.todos

    for (let i of tododata) {
        const listitems = document.createElement("li")
        listitems.classList.add("items")
        listitems.textContent = i.todo

        container.appendChild(listitems)
    }

}

async function createtodo() {
    const apidata = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: input.value,
            completed: false,
            userId: 5,
        })
    })
    return await apidata.json()
}

async function newlist(){
    const response = await createtodo()
    const data = response.todo

    const newlist = document.createElement("li")
    newlist.classList.add("newlist")
    newlist.textContent = data

    container.insertBefore(newlist, container.firstChild)
    input.value = ""
}

display()