import { bookService } from "../../services/Book/books.service.js"
import { ReviewList } from "./ReviewList.jsx";
import { ReviewModal } from "./ReviewModal.jsx";
import { eventBusService } from "../../services/event-bus-service.js"
export class ReviewAdd extends React.Component {

    state = {
        book: null,
        review: null,
        showModal: false,
    };

    componentWillUpdate(prevProps) {
        if (prevProps.book.reviews !== this.props.book.reviews) {
            this.setState({ book: prevProps.book })
        }
    }

    componentDidMount() {
        this.setState({ book: this.props.book, review: { fullName: '', textarea: '', stars: null }, showModal: false })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }))
    }


    

    onAddReview = (ev) => {
        ev.preventDefault()
        const { stars } = this.state.review
        if (!stars) return
        bookService.addReview(this.state.book, this.state.review)
        this.props.loadBook()
        this.toggleModal()
        this.setState(prevState => ({ book: { ...prevState.book } }))
        eventBusService.emit('user-msg', { txt: 'Review Created', type: 'success' })
    }

    onRemoveReview = (reviewId) => {
        bookService.removeReview(this.state.book, reviewId)
        this.setState(prevState => ({ book: { ...prevState.book } }))
        eventBusService.emit('user-msg', { txt: 'Review Deleted', type: 'danger' })
    }


    toggleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal, review: { fullName: '', textarea: '', stars: '', readDate: '' }, book: { ...prevState.book } }))
    }

    setStars = (stars) => {
        this.setState(prevState => ({ review: { ...prevState.review, stars }, book: { ...prevState.book }, showModal: prevState.showModal }))
    }

    render() {
        if (!this.state.book || !this.state.review) return <React.Fragment></React.Fragment>
        const { showModal, book, review } = this.state
        return (
            <React.Fragment>
                {book.reviews && <ReviewList reviews={book.reviews} onRemoveReview={this.onRemoveReview} />}
                <div className="book-details-btn-footer">
                    <button className="btn-add-new-book review-btn" onClick={this.toggleModal}>Write Review</button>
                    <button className="btn-add-new-book" onClick={this.props.onBack}>Books List</button>
                </div>
                {showModal && <ReviewModal review={review} setStars={this.setStars} handleChange={this.handleChange} toggleModal={this.toggleModal} onAddReview={this.onAddReview} />}
            </React.Fragment>
        );
    }
}

