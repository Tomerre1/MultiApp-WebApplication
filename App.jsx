const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { BooksApp } from './pages/Book/BooksApp.jsx'
import { BookDetails } from './pages/Book/BookDetails.jsx'
import { AddNewBook } from './pages/Book/AddNewBook.jsx'
import { EmailApp } from './pages/Email/EmailApp.jsx'
import { NoteApp } from './pages/Note/NoteApp.jsx'
import { Home } from './pages/Home.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'


export function App() {
    return (
        <Router>
            <header className="app-header">
                <AppHeader />
            </header>

            <main>
                <Switch>
                    <Route path="/email/:status/:emailId" component={EmailApp} />
                    <Route path='/email/:status?' component={EmailApp} />
                    <Route path="/book/AddNewBook" component={AddNewBook} />
                    <Route path='/book/:bookId' component={BookDetails} />
                    <Route path='/book' component={BooksApp} />
                    <Route path='/note' component={NoteApp} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
            <AppFooter />
        </Router>
    )
}
