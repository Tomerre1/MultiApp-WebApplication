import { utilService } from "../../services/util-service.js"
import { bookService } from "../../services/Book/books.service.js"
import { GoogleBookList } from "../../cmps/Book/GoogleBookList.jsx"
export class AddNewBook extends React.Component {

    state = {
        books: null
    }
    inputBookNameRef = React.createRef()

    componentDidMount() {
        this.setState({ book: [] })
        this.inputBookNameRef.current.focus()
        this.inputBookNameRef.current.addEventListener('input', utilService.debounce(this.handleChange, 1500))
    }

    handleChange = (e) => {
        const value = e.target.value
        bookService.getGoogleBook(value).then((books) => {
            this.setState({ books })
        })
    }


    render() {
        const { books } = this.state
        return (
            <section className="add-new-book main-layout">
                <h1>Search New book</h1>
                <form className='new-book-search' onSubmit={(e) => { e.preventDefault() }}>
                    <input
                        ref={this.inputBookNameRef}
                        name='bookName'
                        id='by-name'
                        type='text'
                        placeholder='Enter Book Name'
                    />
                </form>
                <GoogleBookList books={books} />
            </section>
        )
    }
}
