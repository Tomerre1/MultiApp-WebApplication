
export class EmailFilter extends React.Component {
    state = {
        filterBy: null
    }

    componentDidMount() {
        const filterBy = { read: null, unread: null, text: '' }
        this.setState({ filterBy })
        // if (this.inputTitle.current) this.inputTitle.current.focus()
    }


    handleChange = (e) => {
        const value = e.target.type === 'search' ? e.target.value : e.target.value;
        const filterBy = { ...this.state.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            debugger
            this.props.onSetFilter(filterBy)
        })
    }

    render() {
        if (!this.state.filterBy) return <div>Loading</div>
        const { text } = this.state.filterBy
        // console.log(text)
        return (
            <form className='book-filter'>
                <div className="search-list flex">
                    <input name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' />
                </div>
            </form>
        )
    }
}
