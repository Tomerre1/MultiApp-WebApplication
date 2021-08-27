
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

    onSetRead = () => {
        if (!this.state.email.isRead) eventBusService.emit('unReadCount', -1)
        emailService.setIsRead(this.state.email)
        this.props.loadEmails()
    }



    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return (
            <Link to={`/email/${email.status}/${email.id}`}>
                <section className={`mail-preview flex space-between align-items ${(!email.isRead) ? 'read' : 'unread'}`} onClick={this.onSetRead}  >
                    <div className="flex sender">
                        <button className="star-btn" onClick={(event) => { event.preventDefault(); this.props.onSetStar(email) }}>
                            <i className={`fas fa-star ${(email.isStar) ? 'active' : ''}`} aria-hidden="true" ></i>
                        </button>
                        <button className="remove-btn" onClick={(event) => { event.preventDefault(); this.props.onRemoveEmail(email.id) }}>
                            <i className="fas fa-trash" aria-hidden="true"></i>
                        </button>
                        <p>{emailService.getLoggedInUser().fullName}</p>
                    </div>
                    <p className="title">{email.subject}</p>
                    <p className="date">{utilService.convertDateToFormat(email.sentAt)}</p>
                </section>
            </Link>

        )
    }
}