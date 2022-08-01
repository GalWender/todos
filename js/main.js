'use strict'

function onInit() {
    console.log('Document is ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()

    const strHTMLs = todos.map((todo) =>
        `
        <li onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">
            ${todo.txt} <p>Importance: ${todo.importance}  Created at: ${todo.createdAt}</p>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>
        `
    )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()

    
    if (todos.length === 0 && gFilterBy === 'DONE'){
        document.querySelector('.todo-list').innerHTML = '<h1>No Done Todos</h1>'
    }
    
    if (todos.length === 0 && gFilterBy === 'ACTIVE'){
        document.querySelector('.todo-list').innerHTML = '<h1>No Active Todos</h1>'
    }
    
    if (todos.length === 0 && gFilterBy === 'ALL'){
        document.querySelector('.todo-list').innerHTML = '<h1>No Todos</h1>'
    }
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)

    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=todo-txt]')
    const elImportance = document.querySelector('[name=importance-txt]')
    // console.log('Adding todo', elTxt.value)
    if (elTxt.value === '') { return }

    if (elImportance.value === '') { elImportance.value = 1 }
    else if (elImportance.value > 0 && elImportance.value < 4) {
        addTodo(elTxt.value, elImportance.value)
        // addTodo(elTxt.)
        renderTodos()

        elTxt.value = ''
        elImportance.value = ''
    }

}

function onSetFilter(filterBy) {
    console.log('Setting filter', filterBy)
    setFilter(filterBy)

    renderTodos()

}
