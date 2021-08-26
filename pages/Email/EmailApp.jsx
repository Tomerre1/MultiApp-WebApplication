const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
import { eventBusService } from "../../services/event-bus-service.js"
export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: { isRead: null, isStar: null, isTrash: null, text: '' }
    }

    componentDidMount() {
        // this.removeFilterEvent = eventBusService.on('mailFilter', (filterBy) => {
        //     this.setState({ filterBy }, () => { this.loadEmails() });
        // })

        this.loadEmails()

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

    onSetStar = (email) => {
        emailService.setIsStar(email)
        this.loadEmails();
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };


    render() {
        const { emails } = this.state
        if (!emails) return <div>Loading.. EmailApp</div>
        return (
            <main className="email-app">
                <EmailNav onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                <div className="email-container flex">
                    <EmailList emails={emails} onSetStar={this.onSetStar} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                </div>
            </main>
        )
    }
}
