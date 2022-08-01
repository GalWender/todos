'use strict'

var gTodos
var gFilterBy = 'ALL'
_createTodos()

function getTodosForDisplay() {
    var todos
    switch (gFilterBy) {
        case 'ALL':
            todos = gTodos
            if (todos === []) { }
            break;
        case 'ACTIVE':
            todos = gTodos.filter(todo => !todo.isDone)
            break;
        case 'DONE':
            todos = gTodos.filter(todo => todo.isDone === true)
            break;
        case 'NAME':
            todos = gTodos.sort((a, b) => (a.txt.toUpperCase() > b.txt.toUpperCase()) ? 1 : -1)
            break;
        case 'CREATED':
            todos = gTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            break;
        case 'IMPORTANCE':
            todos = gTodos.sort((a, b) => a.importance - b.importance).reverse()
            break;

        default:
            todos = gTodos
            break;
    }

    return todos
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    if (confirm('are you sure')) {
        gTodos.splice(idx, 1)
        _saveTodosToStorage()
    }
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, importance) {
    const todoImportance = importance
    const todo = _createTodo(txt, todoImportance)
    gTodos.unshift(todo)
    _saveTodosToStorage()

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

// Private functions - used only by the service itself
function _createTodos() {

    var todos = loadFromStorage('todoDB')


    gTodos = todos
    _saveTodosToStorage()
}

function _createTodo(txt, importance) {
    const todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date().toLocaleString(),
        importance: importance

    }
    return todo
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}
