
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
                <div className={`mail-preview flex space-between align-items ${(!email.isRead) ? 'read' : 'unread'}`} onClick={this.setRead}  >
                    <div className="sender">{emailService.getLoggedInUser().fullName}</div>
                    <p className="title">{email.body}</p>
                    <div className="date">{email.sentAt}</div>
                    <div className="mail-preview-btn-container">
                        <button className="star-btn star-on">
                            <i className="far fa-star" aria-hidden="true"></i>
                        </button>
                        <button className="remove-btn">
                            <i className="far fa-trash-alt" aria-hidden="true"></i>
                        </button><button className="read-btn">
                            <i className="fas fa-envelope-open" aria-hidden="true"></i>
                        </button></div>
                </div>
            </Link>
        )
    }

}