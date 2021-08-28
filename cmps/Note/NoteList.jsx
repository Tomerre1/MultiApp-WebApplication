import { noteService } from '../../services/Note/note.service.js'
import { NoteTextPreview } from './NoteTextPreview.jsx'
import { NoteListPreview } from './NoteListPreview.jsx'
import { NoteImgPreview } from './NoteImgPreview.jsx'
import { NoteSoundPreview } from './NoteSoundPreview.jsx'
import { NoteVideoPreview } from './NoteVideoPreview.jsx'
import { NoteFilter } from './NoteFilter.jsx'
import { NoteAdd } from './NoteAdd.jsx'



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

  onNoteAdd = (type,title) => {
    if(!title) return
    noteService.noteAdd(type,title)
      .then(() => {
        this.loadNotes()
      })
  };

  onNoteDuplicate = (note) => {
    noteService.noteDuplicate(note)
      .then(() => {
        this.loadNotes()
      })
  };

  onSendAsEmail = (note) => {
    let body = ''
    switch (note.type) {
      case 'txt':
        body = note.info.title;
        break;
      case 'video':
        body = 'Check out this video: ' + note.info.url;
        break;
      case 'img':
        body = 'Check out this image: ' + note.info.url;
        break;
      case 'todos':
        const todosToSend = note.info.todos.map((todo) => todo.txt);
        body = 'Todos:\n\n' + todosToSend.join(', ') + '.';
        break;
      default:
        break;
    }
    return `${note.info.title}&body=${body}`
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
        <header className="note-header">
        <NoteFilter onSetFilter={this.onSetFilter} />
        </header>
        <NoteAdd onNoteAdd={this.onNoteAdd}/>

        <div className="note-list">

          {notes.map((note) => {
            return <DynamicCmp key={note.id} note={note} onSendAsEmail={this.onSendAsEmail} onNoteDuplicate={this.onNoteDuplicate} onEditTodo={this.onEditTodo} onAddTodo={this.onAddTodo} onToggleTodo={this.onToggleTodo} onEditNoteTitle={this.onEditNoteTitle} onChangeColor={this.onChangeColor} onTogglePinNote={this.onTogglePinNote} onRemoveNote={this.onRemoveNote} />
          })}
        </div>
      </section>
    )
  }
}