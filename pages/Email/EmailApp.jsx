import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
import { eventBusService } from "../../services/event-bus-service.js"
import { EmailAdd } from "../../cmps/Email/EmailAdd.jsx"
import { EmailDetails } from "./EmailDetails.jsx"

export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: { isRead: null, isStar: null, status: 'inbox', text: '' },
        sortBy: null,
        isCompose: false
    }
    removeBusEvent
    newMail = {}
    componentDidMount() {
        this.removeFilterEvent = eventBusService.on('sortBy', (sortBy) => {
            this.setState({ sortBy }, this.loadEmails);
        })
        const query = new URLSearchParams(this.props.location.search);
        const subject = query.get('subject');
        const body = query.get('body');
        if (body && subject) {
            this.newMail['body'] = body
            this.newMail['subject'] = subject
            this.setState({ isCompose: true });
            console.log('%c  newMail:', 'color: #0e93e0;background: #aaefe5;', this.newMail);
        }
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
        emailService.getEmailById(emailId).then((email) => {
            emailService.removeEmail(emailId)
            if (email.status !== 'trash') eventBusService.emit('unReadCount', -1)
            this.props.history.push(`/email/${email.status}`)
            this.loadEmails()
        })
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
        this.setState({ isCompose: !this.state.isCompose }, this.loadEmails);
    }


    render() {
        const { emails, isCompose } = this.state
        const { params } = this.props.match
        console.log('%c  params:', 'color: #0e93e0;background: #aaefe5;', params);
        if (!emails) return <div>Loading.. EmailApp</div>
        return (
            <main className="email-app">
                <EmailNav toggleCompose={this.toggleCompose} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                <div className="email-container flex">
                    {!params.emailId && <EmailList emails={emails} onSetStar={this.onSetStar} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />}
                    {params.emailId && <EmailDetails onRemoveEmail={this.onRemoveEmail} />}
                    {isCompose && <EmailAdd toggleCompose={this.toggleCompose} newMail={this.newMail} />}

                </div>
            </main>
        )
    }
}
