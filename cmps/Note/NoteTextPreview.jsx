import { NoteActions } from './NoteActions.jsx'

export class NoteTextPreview extends React.Component {
    state = {
        note: null,
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    render() {
        const { note, onRemoveNote, onTogglePinNote, onChangeColor } = this.props

        return (
            <div className="note-card" style={{ backgroundColor: note.style.backgroundColor }}>
                {note.info.txt}
                <NoteActions note={note} onChangeColor={onChangeColor} onTogglePinNote={onTogglePinNote} onRemoveNote={onRemoveNote} />
            </div >
        )
    }
}