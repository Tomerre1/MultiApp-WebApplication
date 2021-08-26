export class NoteFilter extends React.Component {
    state = {
        filterBy: null,
        type: null
    }
    // inputTitle = React.createRef()


    componentDidMount() {
        const filterBy = { title: '' }
        this.setState({ filterBy })
        this.setState({ type: 'all' })
        // if (this.inputTitle.current) this.inputTitle.current.focus()
    }

    handleChange = (e) => {
        const value = e.target.type === 'number' ? +e.target.value : e.target.value;
        const filterBy = { ...this.state.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            // console.log(filterBy.title)
            this.props.onSetFilter(filterBy, this.state.type)
        })
    }

    handleSelectChange = (ev) => {
        // this.setState({ type: ev.target.value })
        this.setState({type: ev.target.value} ,() => {
            this.props.onSetFilter(this.state.filterBy , this.state.type)
        });
    }

    render() {
        if (!this.state.filterBy) return <React.Fragment></React.Fragment>
        const { title } = this.state.filterBy;
        const { type } = this.state;

        return (
            <React.Fragment>
                <form className='note-filter'>
                    {/* <label htmlFor='by-title'>Search a Note: </label> */}
                    <input autoFocus
                        // ref={this.inputTitle}
                        name='title'
                        id='by-title'
                        type='search'
                        placeholder='Search Note'
                        value={title}
                        onChange={this.handleChange}
                    />
                </form>

                <select id="by-type" onChange={this.handleSelectChange} value={type}>
                    <option value="all">All</option>
                    <option value="txt">Text</option>
                    <option value="todos">Todos</option>
                    <option value="video">Video</option>
                    <option value="img">Image</option>
                </select>
            </React.Fragment>
        );
    }
}