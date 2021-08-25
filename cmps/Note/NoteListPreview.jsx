import { NoteActions } from './NoteActions.jsx'

export class NoteListPreview extends React.Component {
    state = {
        note: null,
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    render() {
        const { note, onRemoveNote, onTogglePinNote } = this.props

        return (

            <div className="note-card" style={{ backgroundColor: note.style.backgroundColor }}>
                <h2>{note.info.label}</h2>
                {note.info.todos.map((todo) => {
                    return <p key={todo.txt}>{todo.txt}</p>;
                })}
                <NoteActions note={note} onTogglePinNote={onTogglePinNote} onRemoveNote={onRemoveNote} />

            </div>
        )
    }
}
