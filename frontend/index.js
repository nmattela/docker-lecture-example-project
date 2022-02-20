async function submitNewItem(event) {
    //event.preventDefault()

    const new_item = document.getElementById('new_item')

    const values = await (await fetch("http://localhost:4000/", { method: 'POST', body: new_item.value, })).json()

    populateList(values)
}

async function getItems() {
    return (await (await fetch("http://localhost:4000/")).json())
}

function populateList(items) {
    const list = document.getElementById('list')

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    items.forEach((item) => {
        console.log(item)
        const newChild = document.createElement('li');
        const text = document.createElement('p')
        text.innerText = item.name
        const button = document.createElement('button')
        button.innerText = "delete"
        button.setAttribute("onclick", `remove("${item.name}")`)
        newChild.appendChild(text)
        newChild.appendChild(button)
        list.appendChild(newChild)
    })
}

async function remove(name) {
    const values = await (await fetch("http://localhost:4000/", { method: 'DELETE', body: name, })).json()
    populateList(values)
}

async function main() {
    populateList(await getItems())
}