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
            <img src={book.thumbnail} />
            <div className="card-details" >
                <h4>{book.title}</h4>
                <h4>Price: {book.listPrice.amount}{utilService.getCurrencyIcon(book)}</h4>
                <button className="pointer" onClick={() => onAddBook(book)}>Add Book</button>
            </div>
        </div>
    )
}

