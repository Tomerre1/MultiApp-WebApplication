
export class EmailFilter extends React.Component {
    state = {
        filterBy: null
    }

    componentDidMount() {
        const filterBy = {
            sortRead: '', text: ''
        }
        this.setState({ filterBy })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.filterBy !== this.props.filterBy) {
    //         this.onSetFilter(this.props.filterBy) 
    //     }
    // }


    handleChange = (e) => {
        const value = e.target.value;
        const filterBy = { ...this.state.filterBy, [e.target.name]: value }
        console.log('%c  filterBy:', 'color: #0e93e0;background: #aaefe5;', filterBy);

        this.setState({ filterBy }, () => {
            this.props.onSetFilter(filterBy)
        })
    }

    render() {
        if (!this.state.filterBy) return <div>Loading</div>
        const { text } = this.state.filterBy
        return (
            <form className="flex">
                <input className="search-list" name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' />
                <select className="search-list sort" name="sortRead" onChange={this.handleChange}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>

                </select>
            </form>
        )
    }
}
