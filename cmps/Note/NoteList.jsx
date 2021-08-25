import { noteService } from '../../services/Note/note.service.js'
import { NoteTextPreview } from './NoteTextPreview.jsx'
import { NoteListPreview } from './NoteListPreview.jsx'
import { NoteImgPreview } from './NoteImgPreview.jsx'
import { NoteSoundPreview } from './NoteSoundPreview.jsx'
import { NoteVideoPreview } from './NoteVideoPreview.jsx'


export class NoteList extends React.Component {

  state = {
    notes: null,
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    noteService.query().then((notes) => {
      this.setState({ notes });
    });
  };

  onRemoveNote = (note) => {
    noteService.removeNote(note.id)
      .then(() => {
        this.loadNotes()
      })
  }

  
  onTogglePinNote = (note) => {
    noteService.togglePinNote(note)
      .then(() => {
        this.loadNotes()
      })
  }

  onChangeColor = (note ,color) => {
    noteService.changeColor(note , color)
      .then(() => {
        this.loadNotes()
      })
  }


  render() {
    const { notes } = this.state
    if (!notes) return <div>Loading...</div>

    const DynamicCmp = (props) => {
      switch (props.note.type) {
        case 'txt':
          return <NoteTextPreview {...props} />
        case 'todos':
          return <NoteListPreview {...props} />
        case 'img':
          return <NoteImgPreview {...props} />
        // case 'sound':
        //     return <NoteSoundPreview {...props} />
        case 'video':
          return <NoteVideoPreview {...props} />
        default:
          break;
      }
    }

    return (
      <section className="note-container">

        <div className="note-list">
          {notes.map((note) => {
            return <DynamicCmp key={note.id} note={note} onChangeColor={this.onChangeColor} onTogglePinNote={this.onTogglePinNote} onRemoveNote={this.onRemoveNote} />
          })}
        </div>
      </section>
    )
  }
}

{/* <DynamicCmp onChangeStyle={this.onChangeStyle} type={inputType} name="Popo" /> */ }
