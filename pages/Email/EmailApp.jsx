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
        emailService.query().then((emails) => {
            this.setState({ emails });
        });
    }

    render() {
        const { emails } = this.state
        if (!emails) return <div>Loading..</div>
        return (
            <main className="email-app">
                <EmailNav />
                <div className="email-container flex">
                    <EmailList emails={emails} />
                </div>
            </main>
        )
    }
}
