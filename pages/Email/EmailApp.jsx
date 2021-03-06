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
        isCompose: false,
        isMobileMenuOpen: false
    }
    removeBusEvent
    newMail = null
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
            const prevStatus = email.status
            emailService.removeEmail(emailId)
            if (email.status !== 'trash')
                eventBusService.emit('unReadCount', -1)
            this.props.history.push(`/email/${prevStatus}`)
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

    onToggleMobileMenu = (isSwitchingNavs) => {
        this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
    };


    render() {
        const { emails, isCompose, isMobileMenuOpen } = this.state
        const { params } = this.props.match
        if (!emails) return <div>Loading.. EmailApp</div>
        return (
            <main className={`email-app ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="screen" onClick={this.onToggleMobileMenu}></div>
                <EmailNav toggleCompose={this.toggleCompose} onToggleMobileMenu={this.onToggleMobileMenu} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} />
                <div className="email-container">
                    {!params.emailId && <EmailList onClick={this.onToggleMobileMenu} emails={emails} onSetStar={this.onSetStar} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} loadEmails={this.loadEmails} />}
                    {params.emailId && <EmailDetails onRemoveEmail={this.onRemoveEmail} />}
                    {isCompose && <EmailAdd toggleCompose={this.toggleCompose} newMail={this.newMail} />}

                </div>
            </main >
        )
    }
}
