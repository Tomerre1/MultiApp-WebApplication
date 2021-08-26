const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
import { eventBusService } from "../../services/event-bus-service.js"
import { EmailAdd } from "../../cmps/Email/EmailAdd.jsx"

export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: { isRead: null, isStar: null, isTrash: null, text: '' },
        sortBy: null,
        isCompose: false
    }
    removeBusEvent
    componentDidMount() {
        this.removeFilterEvent = eventBusService.on('sortBy', (sortBy) => {
            this.setState({ sortBy }, this.loadEmails);
        })

        this.loadEmails()

    }

    componentWillUnmount() {
        this.removeFilterEvent()
    }


    loadEmails = () => {
        emailService.query(this.state.filterBy, this.state.sortBy).then((emails) => {
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

    onSetSort = (sortBy) => {
        this.setState({ sortBy }, this.loadEmails);

    }

    toggleCompose = () => {
        this.setState({ isCompose: !this.state.isCompose },this.loadEmails);
    }


    render() {
        const { emails, isCompose } = this.state
        if (!emails) return <div>Loading.. EmailApp</div>
        return (
            <main className="email-app">
                <EmailNav toggleCompose={this.toggleCompose} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                <div className="email-container flex">
                    <EmailList emails={emails} onSetStar={this.onSetStar} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                    {isCompose && <EmailAdd toggleCompose={this.toggleCompose}/>}
                </div>
            </main>
        )
    }
}
