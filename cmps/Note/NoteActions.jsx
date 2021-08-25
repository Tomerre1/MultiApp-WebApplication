
export class NoteActions extends React.Component {


    render(){
        const {note} = this.props

        return (
            <section className="note-actions">
             <button className="action-btn" onClick={() => { this.props.onTogglePinNote(note) }}><i className={`fas fa-thumbtack pin-btn ${note.isPinned ? 'red' : ''}`}></i></button>
             <button>Update</button>
             <button onClick={() => { this.props.onRemoveNote(note) }}>Delete</button>
             <button>Color</button>
            </section>
          )
    }
}