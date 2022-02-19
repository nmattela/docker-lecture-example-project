async function submitNewItem(event) {

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

    items.forEach((item) => document.appendChild(`<li>${item}</li>`))
}

async function main() {
    populateList(await getItems())
}