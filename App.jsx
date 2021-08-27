const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookApp } from './pages/Book/BookApp.jsx'
import { EmailApp } from './pages/Email/EmailApp.jsx'
import { NoteApp } from './pages/Note/NoteApp.jsx'
import { Home } from './pages/Home.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'


export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>

            <main>
                <Switch>
                    <Route path='/book' component={BookApp} />
                    <Route path="/email/:status/:emailId" component={EmailApp} />
                    <Route path='/email/:status?' component={EmailApp} />
                    <Route path='/note' component={NoteApp} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
            <AppFooter/>
        </Router>
    )
}
