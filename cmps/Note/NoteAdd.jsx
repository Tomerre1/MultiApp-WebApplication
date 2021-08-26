export class NoteAdd extends React.Component {
    state = {
        type: null,
        title: null

    }
    inputTitle = React.createRef()

    // if (this.inputTitle.current) this.inputTitle.current.focus()


    componentDidMount() {
        this.setState({ type: 'txt', title: '' })
    }

    handleChange = (e) => {
        const value = e.target.type === 'number' ? +e.target.value : e.target.value;
        this.setState({ title: value })
        // const filterBy = { ...this.state.filterBy, [e.target.name]: value }

        // this.setState({ filterBy }, () => {
        //     // console.log(filterBy.title)
        //     this.props.onSetFilter(filterBy, this.state.type)
        // })
    }

    onChangeType = (type) => {
        this.setState({ title: '', type })

        switch (type) {
            case 'txt':
                this.inputTitle.current.placeholder = 'Add Text Note...'
                break;
            case 'img':
                this.inputTitle.current.placeholder = 'Add Image Url...'
                break;
            case 'video':
                this.inputTitle.current.placeholder = 'Add Video Url...'
                break;
            case 'todos':
                this.inputTitle.current.placeholder = 'Add Comma Separated List...'
                break;
            default:
                break;
        }
    }


    render() {
        const { title, type } = this.state;
        if (!type) return <React.Fragment></React.Fragment>

        return (
            <section className="note-add-container">

                <form className='note-add' onSubmit={() => { this.props.onNoteAdd(type, title) }}>
                    <input
                        ref={this.inputTitle}
                        name='title'
                        // id='by-title'
                        type='text'
                        placeholder='Add Text Note...'
                        value={title}
                        onChange={this.handleChange}
                    />
                </form>
                <div className="note-add-type-container">
                    <button className="action-btn" onClick={() => { this.onChangeType('txt') }}><i style={{ "color": "#000000cc" }} className="fas fa-font"></i></button>
                    <button className="action-btn" onClick={() => { this.onChangeType('img') }}><i style={{ "color": " #04ab04" }} className="far fa-images"></i></button>
                    <button className="action-btn" onClick={() => { this.onChangeType('video') }}><i style={{ "color": "red" }} className="fab fa-youtube"></i></button>
                    <button className="action-btn" onClick={() => { this.onChangeType('todos') }}><i style={{ "color": "#2020c7cc" }} className="fas fa-list-ul"></i></button>
                </div>
            </section>
        );
    }
}