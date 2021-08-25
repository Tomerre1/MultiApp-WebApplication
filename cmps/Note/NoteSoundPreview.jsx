export function NoteTextPreview({ note }) {
    console.log('note',note)
    return (
       
        <div className="note">
            <h2>Hello my note</h2>
            {note.info.txt}
        </div>
    )
}