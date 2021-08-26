import { noteService } from '../../services/Note/note.service.js'
import { NoteTextPreview } from './NoteTextPreview.jsx'
import { NoteListPreview } from './NoteListPreview.jsx'
import { NoteImgPreview } from './NoteImgPreview.jsx'
import { NoteSoundPreview } from './NoteSoundPreview.jsx'
import { NoteVideoPreview } from './NoteVideoPreview.jsx'
import { NoteFilter } from './NoteFilter.jsx'



export class NoteList extends React.Component {

  state = {
    notes: null,
    filterBy: null,
    type:null
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    noteService.query(this.state.filterBy, this.state.type ).then((notes) => {
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

  onChangeColor = (note, color) => {
    noteService.changeColor(note, color)
      .then(() => {
        this.loadNotes()
      })
  }

  onSetFilter = (filterBy , type) => {
    this.setState({ filterBy,type }, this.loadNotes);
  };

  
  onEditNoteTitle = (note, title) => {
    noteService.changeTitle(note, title)
      .then(() => {
        this.loadNotes()
      })
  };

  onEditTodo = (todo, txt) => {
    noteService.EditTodo(todo, txt)
      .then(() => {
        this.loadNotes()
      })
  };

  

  onToggleTodo = (todo) => {
    noteService.toggleTodo(todo)
      .then(() => {
        this.loadNotes()
      })
  };

  onAddTodo = (todos, txt) => {
    noteService.addTodo(todos, txt)
      .then(() => {
        this.loadNotes()
      })
  };

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
        <header>
        <NoteFilter onSetFilter={this.onSetFilter} />
        {/* <AddNote /> */}
        </header>

        <div className="note-list">

          {notes.map((note) => {
            return <DynamicCmp key={note.id} note={note} onEditTodo={this.onEditTodo} onAddTodo={this.onAddTodo} onToggleTodo={this.onToggleTodo} onEditNoteTitle={this.onEditNoteTitle} onChangeColor={this.onChangeColor} onTogglePinNote={this.onTogglePinNote} onRemoveNote={this.onRemoveNote} />
          })}
        </div>
      </section>
    )
  }
}