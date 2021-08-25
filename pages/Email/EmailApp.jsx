const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
export class EmailApp extends React.Component {
    state = {
        emails: null
    }


    componentDidMount() {
        this.loadEmails();
    }

    loadEmails() {
        // debugger;
        // console.log(emailService)
        emailService.query().then((emails) => {
            this.setState({ emails });
        });
    }



    render() {
        const {emails} = this.state
        console.log('%c  emails:', 'color: #0e93e0;background: #aaefe5;', emails);

        if(!emails) return <div> Loading </div>
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
