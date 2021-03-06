
const { withRouter } = ReactRouterDOM
class _BookFilter extends React.Component {
    state = {
        filterBy: null
    }
    minRange = 0
    maxRange = 250

    componentDidMount() {
        const filterBy = { title: '', price: 200 }
        this.setState({ filterBy })
    }


    handleChange = (e) => {
        const value = e.target.type === 'number' ? +e.target.value : e.target.value;
        const filterBy = { ...this.state.filterBy, [e.target.name]: value }
        this.setState({ filterBy }, () => {
            this.props.onSetFilter(filterBy)
        })
    }

    onAddNewBook = () => {
        this.props.history.push('/book/AddNewBook')
    }
    render() {
        if (!this.state.filterBy) return <div>Loading...</div>
        const { title, price } = this.state.filterBy;
        return (
            <React.Fragment>
                {/* <Link to={`/book/AddNewBook`}>Add New Book</Link> */}
                <button className="btn-add-book fa fa-plus" onClick={this.onAddNewBook}></button>
                <form className='book-filter'>
                    <label htmlFor='by-title'>Title: </label>
                    <input
                        ref={this.inputTitle}
                        name='title'
                        id='by-title'
                        type='text'
                        placeholder='Enter title'
                        value={title}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="by-price"> Max Price: </label>
                    <input
                        name='price'
                        id='by-price'
                        type='range'
                        min={this.minRange}
                        max={this.maxRange}
                        value={price}
                        onChange={this.handleChange}
                    />
                    <span>{this.state.filterBy.price}</span>
                </form>
            </React.Fragment>
        );
    }
}
export const BookFilter = withRouter(_BookFilter);
