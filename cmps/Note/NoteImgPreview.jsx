import { NoteActions } from './NoteActions.jsx'

export class NoteImgPreview extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    render() {

        const { note, onRemoveNote , onTogglePinNote, onChangeColor} = this.props

        return (

            <div className="note-card" style={{ backgroundColor: note.style.backgroundColor }}>
                <h2>{note.info.title}</h2>
                <img src={note.info.url} height="150" width="150"></img>
                <NoteActions note={note} onChangeColor={onChangeColor} onTogglePinNote={onTogglePinNote} onRemoveNote={onRemoveNote} />
            </div>
        )
    }
}
