import { GoogleBookPreview } from "./GoogleBookPreview.jsx"
export class GoogleBookList extends React.Component {
    state = {
        books: null,
    }
    componentDidMount() {
        this.setState({ books: this.props.books })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.books !== this.props.books) {
            this.setState({ books: this.props.books })
        }
    }

    render() {
        if (!this.state.books) return <div></div>
        const { books } = this.state
        return (
            <section>
                <div className="google-books-list">
                    {books.map(book => <GoogleBookPreview key={book.id} book={book} />)}
                </div>
            </section>
        )
    }
}


