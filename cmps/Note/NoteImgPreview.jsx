export function NoteImgPreview({ note }) {
    return (
       
        <div className="note">
            <h2>{note.info.title}</h2>
            <img src={note.info.url} height="150" width="150"></img>
        </div>
    )
}

// style: { backgroundColor: "#00d" }