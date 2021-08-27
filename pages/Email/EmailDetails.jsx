import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { emailService } from "../../services/Email/email.service.js"
const { withRouter } = ReactRouterDOM;

const { Link } = ReactRouterDOM
class _EmailDetails extends React.Component {
    state = {
        email: null,
    }

    componentDidMount() {
        this.loadEmail()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId)
            this.loadEmail()
    }

    loadEmail = () => {
        emailService.getEmailById(this.props.match.params.emailId)
            .then(email => {
                if (!email) this.props.history.push('/email/inbox')
                this.setState({ email })
            })
    }

    onBack = () => {
        this.props.history.push('/email/inbox')
    }


    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return (
            <main className="email-app">
                <div className="mail-col-message-view">
                    <div className="message-view-from">
                        From: {email.from}
                    </div>
                    <div className="message-view-title">

                    </div>
                    <div className="message-view-to">
                        To: {emailService.getLoggedInUser().email}
                    </div>
                    <hr />
                    <div className="message-view-body">
                        <h1>{email.subject}</h1>
                        {email.body}
                        <br />
                        <br />
                        <br />
                        Thanks,
                        <br />
                        <br />
                        {email.from}
                    </div>
                </div>
                <div className="flex space-between back-next-btns">
                    <Link to={`/email/${email.status}/${emailService.getNextEmailId(email.id, -1)}`}> <i className="fas fa-arrow-left"></i></Link>
                    <Link to={`/email/${email.status}/${emailService.getNextEmailId(email.id, 1)}`}><i className="fas fa-arrow-right"></i> </Link>
                    <button onClick={() => { this.props.onRemoveEmail(this.props.match.params.emailId) }}><i className="fas fa-trash"></i> </button>
                </div>
                <button className="btn-mail-list" onClick={this.onBack}><i className="fa fa-envelope "></i></button>
            </main>
        )
    }
}

export const EmailDetails = withRouter(_EmailDetails);

