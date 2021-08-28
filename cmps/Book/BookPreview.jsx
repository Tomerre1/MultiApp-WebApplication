const { Link } = ReactRouterDOM
import { utilService } from '../../services/util-service.js'


export function BookPreview({ book }) {
    return (
        <Link to={`/book/${book.id}`}>
            <article className="book-preview main-layout">
                <h4>{book.title}</h4>
                <img src={book.thumbnail} />
                <h4>Price - {book.listPrice.amount} {utilService.getCurrencyIcon(book)}</h4>
            </article>
        </Link>
        
    )
}