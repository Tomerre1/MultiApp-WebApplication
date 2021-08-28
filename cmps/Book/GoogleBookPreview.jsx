import { bookService } from "../../services/Book/books.service.js"
import { utilService } from "../../services/util-service.js"
import { eventBusService } from "../../services/event-bus-service.js"




export function GoogleBookPreview({ book }) {

    const onAddBook = (book) => {
        bookService.addBook(book)
        eventBusService.emit('user-msg', { txt: `Book ${book.title} was successfully added`, type: 'success', bookId: book.id })


    }

    return (
        <div className="card" key={book.id}>
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
            <button className="pointer btn-add-new-book" onClick={() => onAddBook(book)}>Add</button>

        </div>
    )
}
