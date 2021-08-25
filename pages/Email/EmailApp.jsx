const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"

export class EmailApp extends React.Component {
    render() {
        return (
            <Router>
                <main className="email-app">
                    <EmailNav />
                    <div className="email-container flex">
                        <Switch>
                            {/* {/* <Route component={AddMail} path="/email/add-mail" /> */}
                            <Route component={EmailList} path="/email" />
                        </Switch>
                    </div>
                </main>
            </Router>
        )
    }
}
