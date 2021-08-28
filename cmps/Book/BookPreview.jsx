const { Link } = ReactRouterDOM
import { utilService } from '../../services/util-service.js'


export function BookPreview({ book }) {
    return (
        <Link to={`/book/${book.id}`}>
            <div className="card">
                <div className="book-gallery-header">
                    <div className="heading">
                        <h1 className="main_heading">{book.title}</h1>
                    </div>
                </div>
                <div className="book-img-container">
                    <img className="book-img" src={book.thumbnail} alt="" />
                </div>
                <div className="book-price">
                        <h2>Price: {book.listPrice.amount}{utilService.getCurrencyIcon(book)}</h2>
                </div>
            </div>

        </Link >

    )
}