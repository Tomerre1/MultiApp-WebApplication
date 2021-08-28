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

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }))
    }

    componentDidMount() {
        this.setState({ book: this.props.book, review: { fullName: '', textarea: '', stars: null }, showModal: false })
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        const { stars } = this.state.review
        if (!stars) return
        this.toggleModal()
        bookService.addReview(this.state.book, this.state.review)
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
                    <button className="btn-add-new-book review-btn" onClick={this.toggleModal}>Write a Review</button>
                    <button className="btn-add-new-book" onClick={this.props.onBack}>Back To Book List</button>
                {showModal && <ReviewModal review={review} setStars={this.setStars} handleChange={this.handleChange} toggleModal={this.toggleModal} onAddReview={this.onAddReview} />}
            </React.Fragment>
        );
    }
}

