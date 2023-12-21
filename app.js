const container = document.getElementById("List")

async function display(){
    const result = await fetch('https://dummyjson.com/todos');
    const data = await result.json()
    console.log(data)

    const tododata = data.todos

    for(let i of tododata){
        const listitems = document.createElement("li")
        listitems.classList.add("items")
        listitems.textContent = i.todo

        container.appendChild(listitems)
    }

}
display()