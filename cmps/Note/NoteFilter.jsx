export class NoteFilter extends React.Component {
    state = {
        filterBy: null
    }
    // inputTitle = React.createRef()


    componentDidMount() {
        const filterBy = { title: '' }
        this.setState({ filterBy })
        // if (this.inputTitle.current) this.inputTitle.current.focus()
    }

    handleChange = (e) => {
        const value = e.target.type === 'number' ? +e.target.value : e.target.value;
        const filterBy = { ...this.state.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            this.props.onSetFilter(filterBy)
        })
    }

    render() {
        if (!this.state.filterBy) return <React.Fragment></React.Fragment>
        const { title } = this.state.filterBy;

        return (
            <form className='note-filter'>
                <label htmlFor='by-title'>Search a Note: </label>
                <input autoFocus
                    // ref={this.inputTitle}
                    name='title'
                    id='by-title'
                    type='text'
                    placeholder='Search Note'
                    value={title}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}