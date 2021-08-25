const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { keepService } from '../../services/Keep/keep.service.js'
import { NoteList } from '../../cmps/Keep/NoteList.jsx'
import { AddNote } from '../../cmps/Keep/AddNote.jsx'




export class KeepApp extends React.Component {

    state = {}


    saveNote = (txt, noteType) => {
        keepService.addNote(txt, noteType)
    }

    render() {
        return (
            <main className="keep-app">
                <Router>
                    <AddNote saveNote={this.saveNote} />
                    <NoteList />
                </Router>
            </main>)

    }
}