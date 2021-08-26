
export class NoteActions extends React.Component {

    state = {
        isColorChange: false
    }

    toggleStyleMode = () => {
        this.setState({ isColorChange: !this.state.isColorChange })
    }

    onColor = (color) => {
        this.props.onChangeColor(this.props.note, color)
        this.toggleStyleMode()
    }

    render() {
        const { note } = this.props

        return (
            <section className="note-actions">
                <button className="action-btn" onClick={() => { this.props.onTogglePinNote(note) }}><i className={`fas fa-thumbtack pin-btn ${note.isPinned ? 'red-pin' : 'white'}`}></i></button>
                <button className="action-btn" onClick={() => { this.props.onRemoveNote(note) }}><i className="far fa-trash-alt trash-color"></i></button>
                <button className="action-btn" onClick={() => { this.toggleStyleMode() }}><i className="fas fa-palette palette"></i></button>
                {note.type === 'todos' && <button onClick={() => { this.props.onAddTodo(note.info.todos , 'New Todo') }} className="action-btn gold"><i className="fas fa-plus"></i></button>}

                {this.state.isColorChange && <div className="color-btn-container">
                    <button className="color-btn red" onClick={() => { this.onColor('#FD3A4A') }}></button>
                    <button className="color-btn green" onClick={() => { this.onColor('#8BC34A') }}></button>
                    <button className="color-btn blue" onClick={() => { this.onColor('#2196F3') }}></button>
                    <button className="color-btn yellow" onClick={() => { this.onColor('#FBE870') }}></button>
                    <button className="color-btn purple" onClick={() => { this.onColor('#FF6EFF') }}></button>
                    <button className="color-btn orange" onClick={() => { this.onColor('#FF7F49') }}></button>
                    <button className="color-btn pink" onClick={() => { this.onColor('#F653A6') }}></button>
                    <button className="color-btn unset" onClick={() => { this.onColor('white') }}></button>
                </div>}
            </section>
        )
    }
}