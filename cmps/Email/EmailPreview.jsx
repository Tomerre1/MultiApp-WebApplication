
import { emailService } from "../../services/Email/email.service.js"
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

    setRead = () => {
        emailService.setIsRead(this.state.email)
        this.setState(prevState => ({ email: { ...prevState.email, } }))
    }


    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return (
            <Link to={`/email/${email.id}`}>
                    <section className={`mail-preview flex space-between align-items ${(!email.isRead) ? 'read' : 'unread'}`} onClick={this.setRead}  >
                        <div className="flex sender">
                            <button className="star-btn">
                                <i className="fas fa-star" aria-hidden="true" ></i>
                            </button>
                            <button className="remove-btn" onClick={() => { this.props.onRemoveEmail(email.id) }}>
                                <i className="fas fa-trash" aria-hidden="true"></i>
                            </button>
                            <p>{emailService.getLoggedInUser().fullName}</p>
                        </div>
                        <p className="title">{email.subject}</p>
                        <p className="date">{email.sentAt}</p>
                    </section>
            </Link>

        )
    }
}