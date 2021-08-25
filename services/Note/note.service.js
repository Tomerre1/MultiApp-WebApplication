/* Keep Service */
import { func } from 'prop-types'
import { storageService } from '../storage-service.js'
import { utilService } from '../util-service.js'

export const noteService = {
    query,
    removeNote,
    togglePinNote
}

const KEY = 'notesDB'
const notesFromStorage = storageService.loadFromStorage(KEY)
let gNotes = (notesFromStorage && notesFromStorage.length) ? notesFromStorage : createNotes()

storageService.saveToStorage(KEY, gNotes)


// const gNotes = [{
//         id: utilService.makeId(),
//         type: "txt",
//         isPinned: true,
//         info: { txt: "Fullstack Me Baby!" },
//         style: { backgroundColor: utilService.getRandomColor() }
//     },
//     {
//         id: utilService.makeId(),
//         type: "txt",
//         isPinned: true,
//         info: { txt: "Helloooooooo!" },
//         style: { backgroundColor: utilService.getRandomColor() }
//     },
//     {
//         id: utilService.makeId(),
//         type: "img",
//         info: { url: "https://html.com/wp-content/uploads/very-large-flamingo.jpg", title: "Bobi and Me" },
//         style: { backgroundColor: utilService.getRandomColor() }
//     },
//     {
//         id: utilService.makeId(),
//         type: "todos",
//         info: {
//             label: "Get my stuff together",
//             todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
//         },
//         style: { backgroundColor: utilService.getRandomColor() }
//     },
//     {
//         id: utilService.makeId(),
//         type: "video",
//         info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Bobi and Me" },
//         style: { backgroundColor: utilService.getRandomColor() }
//     },
// ];

function query() {
    sortByPin()
    return Promise.resolve(gNotes)
}

function createNotes() {
    const notes = [{
            id: utilService.makeId(),
            type: "txt",
            isPinned: true,
            info: { txt: "Fullstack Me Baby!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                label: "Get my stuff together",
                todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
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
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                label: "Get my stuff together",
                todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
            },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "txt",
            isPinned: true,
            info: { txt: "Helloooooooo!" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Bobi and Me" },
            style: { backgroundColor: utilService.getRandomColor() }
        },
        {
            id: utilService.makeId(),
            type: "todos",
            isPinned: false,
            info: {
                label: "Get my stuff together",
                todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
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
                label: "Get my stuff together",
                todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
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

function removeNote(noteId) {
    const noteIdx = getNoteIdxById(noteId)
    gNotes.splice(noteIdx, 1)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function togglePinNote(note) {
    if (!note.isPinned) {
        note.isPinned = true
            //Just For Check
        note.style.backgroundColor = 'red'
    } else {
        note.isPinned = false
            //Just For Check
        note.style.backgroundColor = 'white'

    }
    sortByPin()
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function sortByPin() {
    gNotes.sort((a, b) => b.isPinned - a.isPinned)
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