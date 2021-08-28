import { utilService } from '../../services/util-service.js'
import { LongTxt } from '../../cmps/Book/LongTxt.jsx'
import { bookService } from '../../services/Book/books.service.js'
import { ReviewAdd } from '../../cmps/Book/ReviewAdd.jsx'
import { Loader } from "../../cmps/Book/Loader.jsx";
const { Link } = ReactRouterDOM




export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: null,
        book: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadBook()
        }, 500);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) this.loadBook()
    }

    loadBook = () => {
        const id = this.props.match.params.bookId
        bookService.getBookById(id)
            .then(book => {
                if (!book) this.props.history.push('/')
                this.setState({ book })
            })
    }

    getLengthReading = () => {
        if (this.state.book.pageCount > 500) return '- Long reading'
        else if (this.state.book.pageCount > 200) return '- Decent Reading'
        else if (this.state.book.pageCount < 100) return '- Light Reading'
    }

    getBookAge = () => {
        const age = new Date().getFullYear() - this.state.book.publishedDate
        if (age >= 10) return 'Veteran Book'
        else if (age <= 1) return 'New!'
    }

    getPriceColor = () => {
        const price = (this.state.book.listPrice.amount)
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
    }

    toggleTxtShown = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onBack = () => {
        this.props.history.push('/book')
    }

    render() {
        const { book } = this.state
        if (!book) return <Loader />
        return (

            <section className="book-page">
                <div className="book-prev-next flex" >
                    <Link to={`/book/${bookService.getNextBookId(book.id, -1)}`}> ᐸ Previous Book</Link>
                    <Link to={`/book/${bookService.getNextBookId(book.id, 1)}`}>Next Book ᐳ</Link>
                </div>

                <main className="book-details flex">
                    <div className="details flex">
                        <div>
                            <p><span className="underline">Title:</span> {book.title}</p>
                            <p><span className="underline">Subtitle:</span> {book.subtitle}</p>
                        </div>

                        <div>
                            <p><span className="underline">Authors:</span> {[...book.authors.join(', ')]}</p>
                            <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} toggleTxtShown={this.toggleTxtShown} />
                        </div>

                        <p><span className="underline">Price:</span> <span className={this.getPriceColor()}> {book.listPrice.amount} {utilService.getCurrencyIcon(book)} </span></p>
                        <div>
                            <p><span className="underline">Published Date:</span> {book.publishedDate} {this.getBookAge()}</p>
                            <p><span className="underline">PageCount:</span> {book.pageCount} Pages {this.getLengthReading()} </p>
                            <p><span className="underline">Categories:</span> {[...book.categories.join(', ')]}</p>
                            <p><span className="underline">Language:</span> {book.language}</p>
                        </div>
                    </div>
                    <div className="book-img">
                        {book.listPrice.isOnSale && <div className="sale-img">
                            <img src="../assets/img/sale-book.png" />
                        </div>}
                        <img src={book.thumbnail} />
                    </div>
                </main>
                <ReviewAdd book={book} />
                <button className="btn" onClick={this.onBack}>Back To Book List</button>
            </section>
        )
    }
}

