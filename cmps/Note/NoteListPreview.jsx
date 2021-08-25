import { NoteActions } from './NoteActions.jsx'

export class NoteListPreview extends React.Component {
    state = {
        note: null,
        isEdit: false,
        title: ''
    }

    componentDidMount() {
        this.setState({ note: this.props.note, title: this.props.note.info.title })
    }

    //Functions for Edit mode
    onEditMode() {
        this.setState({ isEdit: true })
    }
    handleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ title: value })
    }
    onSaveNote(note, title) {
        this.props.onEditNoteTitle(note, title)
        this.setState({ isEdit: false })
    }

    render() {
        const { note, onRemoveNote, onTogglePinNote, onChangeColor } = this.props
        const { isEdit, title } = this.state

        return (

            <div className="note-card" style={{ backgroundColor: note.style.backgroundColor }}>
                {!isEdit &&
                    <h2 onClick={() => { this.onEditMode() }}>{note.info.title}</h2>
                }
                {isEdit &&
                    <form className='note-edit'>
                        <label>Edit Note: </label>
                        <input autoFocus type='text' name="title" value={title} onChange={this.handleChange} />
                        <button type="button" onClick={() => { this.onSaveNote(note, title) }}>Save</button>
                    </form>
                }
                {note.info.todos.map((todo) => {
                    return <p key={todo.txt}>{todo.txt}</p>;
                })}
                <NoteActions note={note} onChangeColor={onChangeColor} onTogglePinNote={onTogglePinNote} onRemoveNote={onRemoveNote} />

            </div>
        )
    }
}
