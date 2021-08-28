
import { emailService } from "../../services/Email/email.service.js"
import { utilService } from "../../services/util-service.js"
import { eventBusService } from "../../services/event-bus-service.js"

const { Link } = ReactRouterDOM
export class EmailPreview extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.setState({
            email: this.props.email,
        })
    }

    onToggleRead = () => {
        // debugger;
        if (!this.state.email.isRead) eventBusService.emit('unReadCount', -1)
        else if (this.state.email.isRead) eventBusService.emit('unReadCount', +1)
        emailService.toggleIsRead(this.state.email)
        this.props.loadEmails()
        this.setState({ email: { ...this.state.email, isRead: this.state.email.isRead } })
    }

    onSetRead = () => {
        // debugger;
        if (!this.state.email.isRead) eventBusService.emit('unReadCount', -1)
        emailService.setRead(this.state.email)
        this.props.loadEmails()
        this.setState({ email: { ...this.state.email, isRead: !this.state.email.isRead } })
    }

    getCurrentStatus = () => {
        const { email } = this.state
        if (email.status === 'sent' && email.status !== 'trash') return 'sent'
        else if (email.isStar && email.status !== 'trash') return 'star'
        else if (email.isRead && email.status !== 'trash') return 'read'
        else if (!email.isRead && email.status !== 'trash') return 'unread'
        else if (email.status === 'trash') return 'trash'
        else return 'inbox'
    }






    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return (
            <Link to={`/email/${this.getCurrentStatus()}/${email.id}`}>
                <section className={`mail-preview flex space-between ${(email.isRead) ? 'unread' : 'read'}`} onClick={this.onSetRead}  >
                    <div className="flex sender">
                        <div>

                            <button className="star-btn" onClick={(event) => { event.preventDefault(); event.stopPropagation(); this.props.onSetStar(email) }}>
                                <i className={`fas fa-star ${(email.isStar) ? 'active' : ''}`} aria-hidden="true" ></i>
                            </button>
                            <button className="remove-btn" onClick={(event) => { event.preventDefault(); event.stopPropagation(); this.props.onRemoveEmail(email.id) }}>
                                <i className="fas fa-trash" aria-hidden="true"></i>
                            </button>
                            <button className="mail-is-open-btn" onClick={(event) => { event.preventDefault(); event.stopPropagation(); this.onToggleRead(event) }}>
                                <i className={`${(email.isRead) ? 'fas fa-envelope-open' : 'fas fa-envelope'}`} aria-hidden="true"></i>
                            </button>
                        </div>
                        <p>{emailService.getLoggedInUser().fullName}</p>
                    </div>
                    <p className="title">{email.subject}</p>
                    <p className="date">{utilService.convertDateToFormat(email.sentAt)}</p>
                </section>
            </Link>

        )
    }
}