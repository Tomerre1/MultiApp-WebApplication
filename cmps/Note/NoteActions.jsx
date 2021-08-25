
export class NoteActions extends React.Component {


    render(){
        const {note} = this.props

        return (
            <section className="note-actions">
             <button>Pin</button>
             <button>Update</button>
             <button onClick={() => { this.props.onRemoveNote(note) }}>Delete</button>
             <button>Color</button>
            </section>
          )
    }
}