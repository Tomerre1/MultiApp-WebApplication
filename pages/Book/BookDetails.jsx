import { utilService } from '../../services/util-service.js'
import { LongTxt } from '../../cmps/Book/LongTxt.jsx'
import { bookService } from '../../services/Book/books.service.js'
import { ReviewAdd } from '../../cmps/Book/ReviewAdd.jsx'
import { Loader } from "../../cmps/Book/Loader.jsx";
const { Link } = ReactRouterDOM




export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: null,
        book: null,
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
                this.setState({ book: { ...book } })
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
            <React.Fragment>

                <section className="book-page">
                    <div className="book-prev-next flex" >
                        <Link to={`/book/${bookService.getNextBookId(book.id, -1)}`}> ᐸ Previous Book</Link>
                        <Link to={`/book/${bookService.getNextBookId(book.id, 1)}`}>Next Book ᐳ</Link>
                    </div>

                    <main className="book-details">
                        <div className="item-pane">

                            <div className="item-preview">
                                {book.listPrice.isOnSale && <div className="sale-img">
                                    <img src="assets/img/sale-book.png" />
                                </div>}
                                <img src={book.thumbnail} />
                            </div>

                            <div className="item-details">
                                <h1>{book.title}</h1>
                                <span className="subtitle">{book.subtitle}</span>


                                <div className="pane__section">
                                    <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} toggleTxtShown={this.toggleTxtShown} />
                                </div>

                                <div className="pane__section">
                                    <dl>
                                        <dt>Authors</dt>
                                        <dd>{[...book.authors.join(', ')]}</dd>
                                        <dt>Price</dt>
                                        <dd>{book.listPrice.amount} {utilService.getCurrencyIcon(book)}</dd>
                                        <dt>Categories</dt>
                                        <dd>{[...book.categories.join(', ')]}</dd>
                                        <dt>Published</dt>
                                        <dd>{book.publishedDate} {this.getBookAge()}</dd>
                                        <dt>PageCount</dt>
                                        <dd>{book.pageCount} Pages {this.getLengthReading()}</dd>
                                        <dt>Language</dt>
                                        <dd>{book.language}</dd>
                                    </dl>
                                </div>

                                <div className="pane__section clearfix">
                                    <span className="item-price">{book.listPrice.amount}<span className="item-price__units">{utilService.getCurrencyIcon(book)}</span>
                                    </span><a className="buy-button" href="#">Purchase</a>
                                </div>

                            </div>

                        </div>
                    </main>
                </section>
                <section className="book-details-footer">
                    <div className="book-reviews">
                        <ReviewAdd loadBook={this.loadBook} book={book} onBack={this.onBack} />
                    </div>

                </section>
            </React.Fragment>
        )
    }
}

