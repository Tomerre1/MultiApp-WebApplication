/* Keep Service */
import { storageService } from '../storage-service.js'
import { utilService } from '../util-service.js'

export const noteService = {
    query,
    removeNote,
    togglePinNote,
    changeColor,
    changeTitle,
    toggleTodo,
    addTodo,
    EditTodo,
    noteAdd,
    noteDuplicate
}

const KEY = 'notesDB'
const notesFromStorage = storageService.loadFromStorage(KEY)
let gNotes = (notesFromStorage && notesFromStorage.length) ? notesFromStorage : _createNotes()
storageService.saveToStorage(KEY, gNotes)

function query(filterBy, type) {
    orderTodos()
    sortByPin()

    if (filterBy || type) {
        let { title } = filterBy
        //If sort by type
        if (type && type !== 'all') {
            let notesToShowByType = gNotes.filter(note => note.type === type)
                //If sort by type and search
            if (filterBy) {
                const notesToShow = notesToShowByType.filter(note => note.info.title.toLowerCase().includes(title.toLowerCase()))
                return Promise.resolve(notesToShow)
            }
        }
        //If sort only by search
        const notesToShow = gNotes.filter(note => note.info.title.toLowerCase().includes(title.toLowerCase()))
        return Promise.resolve(notesToShow)
    }
    //Not sorting
    return Promise.resolve(gNotes)
}

function removeNote(noteId) {
    const noteIdx = getNoteIdxById(noteId)
    gNotes.splice(noteIdx, 1)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function togglePinNote(note) {
    if (!note.isPinned) note.isPinned = true
    else note.isPinned = false
    sortByPin()
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function changeColor(note, color) {
    note.style.backgroundColor = color
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function changeTitle(note, title) {
    note.info.title = title
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function sortByPin() {
    gNotes.sort((a, b) => b.isPinned - a.isPinned)
    return Promise.resolve()
}

function toggleTodo(todo) {
    todo.isDone = !todo.isDone
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function getNoteIdxById(noteId) {
    return gNotes.findIndex((note) => {
        return note.id === noteId
    })
}

function getNoteById(noteId) {
    let note = gNotes.find(function(note) {
        return noteId === note.id
    })
    return note
}

function addTodo(todos, txt) {
    todos.unshift({ txt, isDone: false })
    orderTodos()
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function EditTodo(todo, txt) {
    todo.txt = txt
    orderTodos()
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function orderTodos() {
    gNotes.forEach(note => {
        if (note.type === 'todos') {
            if (!note.info.todos) return
            note.info.todos.sort((a, b) => a.isDone - b.isDone)
        }
    });
    return Promise.resolve()
}

function noteAdd(type, input) {
    let newNote = {
        id: utilService.makeId(),
        type,
        isPinned: true,
        style: { backgroundColor: utilService.getRandomColor() }
    }
    switch (type) {
        case 'txt':
            newNote.info = { title: input }
            break;

        case 'img':
            newNote.info = { url: input, title: 'New Image!' }
            break;

        case 'video':
            newNote.info = { url: input, title: 'New Video!' }
            break;

        case 'todos':
            newNote.info = { title: 'New Todo List:', todos: [] }
            const todosList = input.split(',')
            todosList.forEach((todo) => {
                newNote.info.todos.push({ txt: todo, isDone: false })
            });
            break;
        default:
            break;
    }
    gNotes.push(newNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function noteDuplicate(note) {
    const noteCopy = {...note }
    noteCopy.id = utilService.makeId()
    gNotes.push(noteCopy)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function _createNotes() {
    const notes = [{
            id: utilService.makeId(),
            type: "txt",
            isPinned: true,
            info: { title: "Fullstack Me Baby!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                title: "Get my stuff together",
                todos: [{ txt: "Driving liscence", isDone: true }, { txt: "Coding power", isDone: false }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "New Video!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                title: "Get my stuff together",
                todos: [{ txt: "Driving liscence", isDone: true }, { txt: "Coding power", isDone: true }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "img",
            isPinned: false,
            info: { url: "https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80", title: "Cute puppy!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Cool!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "txt",
            isPinned: true,
            info: { title: "Helloooooooo!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                title: "Important",
                todos: [{ txt: "Shopping", isDone: false }, { txt: "Learning", isDone: false }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                title: "Important",
                todos: [{ txt: "Shopping", isDone: false }, { txt: "Learning", isDone: false }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "img",
            isPinned: false,
            info: { url: "https://html.com/wp-content/uploads/very-large-flamingo.jpg", title: "Bobi and Me" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                title: "Get my stuff together",
                todos: [{ txt: "Driving liscence", isDone: false }, { txt: "Coding power", isDone: true }, { txt: "Something", isDone: true }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Bobi and Me" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
    ];
    return notes
}