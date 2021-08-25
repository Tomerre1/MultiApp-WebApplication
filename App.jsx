const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookApp } from './pages/Book/BookApp.jsx'
import { EmailApp } from './pages/Email/EmailApp.jsx'
import { EmailDetails } from './pages/Email/EmailDetails.jsx'
import { NoteApp } from './pages/Note/NoteApp.jsx'
import { Home } from './pages/Home.jsx'


export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>

            <main>
                <Switch>
                    <Route path='/book' component={BookApp} />
                    <Route path='/email/:emailId' component={EmailDetails} />
                    <Route path="/email" component={EmailApp} />
                    <Route path='/note' component={NoteApp} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
        </Router>
    )
}