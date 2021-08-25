/* Keep Service */
import { storageService } from '../storage-service.js'
import { utilService } from '../util-service.js'

export const noteService = {
    query,
}



const gNotes = [{
        id: utilService.makeId(),
        type: "txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" }
    },
    {
        id: utilService.makeId(),
        type: "txt",
        isPinned: true,
        info: { txt: "Helloooooooo!" }
    },
    {
        id: utilService.makeId(),
        type: "img",
        info: { url: "https://html.com/wp-content/uploads/very-large-flamingo.jpg", title: "Bobi and Me" },
        style: { backgroundColor: "#00d" }
    },
    // {
    //     id: utilService.makeId(),
    //     type: "todos",
    //     info: {
    //         label: "Get my stuff together",
    //         todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
    //     }
    // },
    // {
    //     id: utilService.makeId(),
    //     type: "video",
    //     info: { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Bobi and Me" },
    //     style: { backgroundColor: "#00d" }
    // },
];

function query() {
    return Promise.resolve(gNotes)
}