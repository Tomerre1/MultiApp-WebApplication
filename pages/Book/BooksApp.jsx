import { BookList } from '../../cmps/Book/BookList.jsx';
import { bookService } from '../../services/Book/books.service.js';
import { BookFilter } from '../../cmps/Book/BookFilter.jsx';


export class BooksApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        selectedBook: null,
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy).then((books) => {
            this.setState({ books });
        });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);
    };

    render() {
        const { books } = this.state
        return (
            <section className='books-app main-layout'>
                <React.Fragment>
                <h1 className="Logo books-logo">MultiBook</h1>
                    <BookFilter onSetFilter={this.onSetFilter} />
                    <BookList books={books} />
                </React.Fragment>
            </section>
        );
    }
}