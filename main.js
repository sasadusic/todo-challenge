const newTodo = document.querySelector('#new-todo')
const add = document.querySelector('#add')
const inputCont = document.querySelector('.input-cont')
const items = document.querySelector('#items')
const theme = document.querySelector('#theme')
const container = document.querySelector('#container')
const active = document.querySelector('.active')
const completed = document.querySelector('.completed')
const all = document.querySelector('.all')
const clear = document.querySelector('.clear')
const left = document.querySelector('#left-num')

let todoList = []

active.onclick = () => {
    onlyActives()
    completed.classList.remove('color')
    all.classList.remove('color')
    active.classList.add('color')
}
completed.onclick = () => {
    onlyCompleted()
    completed.classList.add('color')
    all.classList.remove('color')
    active.classList.remove('color')
}
all.onclick = () => {
    renderTodos(todoList)
    completed.classList.remove('color')
    all.classList.add('color')
    active.classList.remove('color')
}
clear.onclick = () => {
    todoList = todoList.filter(todo => todo.completed === false)
    renderTodos(todoList)
}

theme.onclick = () => {
    theme.classList.toggle('light')
    container.classList.toggle('container-light')
}


add.disabeled = true

newTodo.change = () => {
    if(newTodo.value.length > 0){
        add.disabeled = false
    }
    else{
        add.disabeled = true
    }
}

inputCont.onsubmit = () => {
    if(newTodo.value.length > 0){
        const value = newTodo.value
        let item = {
            id: Date.now(),
            text: value,
        completed: false
    }
    todoList.push(item)
    renderTodos(todoList)
    newTodo.value = ''
    add.disabeled = true
    return false
}
}

const renderTodos = (todos) => {
    items.innerHTML = ''
    todos.forEach(todo => {
        const li = document.createElement('li')
        li.id = todo.id
        li.className = `item`
        const cont = document.createElement('div')
        cont.className = 'check-cont'
        const checkOver = document.createElement('div')
        checkOver.classList.add('check-over')
        if(todo.completed === true){
            checkOver.classList.add('nike')
        }
        const text = document.createElement('div')
        text.className = 'text'
        text.innerText = todo.text
        const deleteCont = document.createElement('div')
        deleteCont.className = 'delete-cont'
        deleteCont.addEventListener('click', () => {
            deleteItem(todo.id)
        })
        
        
        
        const checkBox = document.createElement('input')
        checkBox.className = 'check'
        checkBox.type = "checkbox"
        checkBox.checked = todo.completed
        checkBox.addEventListener('change', function () {
            todo.completed = !todo.completed
            renderTodos(todoList);
          });
        cont.appendChild(checkOver)
        cont.appendChild(checkBox)
        li.appendChild(cont)
        li.appendChild(text)
        li.appendChild(deleteCont)
        items.appendChild(li)

    })
    const leftItems = todoList.filter(t => t.completed === false)
    left.innerText = leftItems.length
}
const deleteItem = (item_id) => {
    todoList = todoList.filter(item => item.id !== item_id)
    renderTodos(todoList)
}

const onlyCompleted = () => {
    let completedTodos = todoList.filter(todo => todo.completed === true)
    renderTodos(completedTodos)
}
const onlyActives = () => {
    let activeTodos = todoList.filter(todo => todo.completed === false)
    renderTodos(activeTodos)
}
