const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadEmails();
    }

   
    loadEmails = () => {
        emailService.query(this.state.filterBy).then((emails) => {
            this.setState({ emails });
        });
    }

    onRemoveEmail = (emailId) => {
        emailService.removeEmail(emailId);
        this.loadEmails();
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };

    render() {
        const { emails } = this.state
        if (!emails) return <div>Loading..</div>
        return (
            <main className="email-app">
                <EmailNav onSetFilter={this.onSetFilter} filterBy={this.filterBy}/>
                <div className="email-container flex">
                    <EmailList emails={emails} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} />
                </div>
            </main>
        )
    }
}
