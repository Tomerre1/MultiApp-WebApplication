// import {BookPreview} from './BookPreview.jsx'
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


  render() {
    const { notes } = this.state
    if (!notes) return <div>Loading...</div>

    const DynamicCmp = (props) => {
      switch (props.note.type) {
        case 'txt':
          return <NoteTextPreview {...props} />
        //   case 'todos':
        //     return <NoteListPreview {...props} />
        case 'img':
            return <NoteImgPreview {...props} />
        // case 'sound':
        //     return <NoteSoundPreview {...props} />
        // case 'video':
        //     return <NoteVideoPreview {...props} />
        default:
          break;
      }
    }



    return (
      <section className="note-container">

        <h1>Notes list</h1>
        <div className="note-list">
          {notes.map((note) => {
            return <DynamicCmp key={note.id} note={note} />
          })}

        </div>


      </section>
    )
  }
}

{/* <DynamicCmp onChangeStyle={this.onChangeStyle} type={inputType} name="Popo" /> */ }
