import { NoteActions } from './NoteActions.jsx'

export class NoteVideoPreview extends React.Component {

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
                <h2>{note.info.title}</h2>
                <iframe width="200" height="155"
                    src={note.info.url}>
                </iframe>
                <NoteActions note={note} onTogglePinNote={onTogglePinNote} onRemoveNote={onRemoveNote} />
            </div>
        )
    }
}
