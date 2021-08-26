import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { emailService } from "../../services/Email/email.service.js"
const { Link } = ReactRouterDOM
export class EmailDetails extends React.Component {

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
        const id = this.props.match.params.emailId
        emailService.getEmailById(id)
            .then(email => {
                if (!email) this.props.history.push('/email')
                this.setState({ email })
            })
    }

    onBack = () => {
        this.props.history.push('/email')
    }

    onRemoveEmail = () => {
        emailService.removeEmail(this.state.email.id)
        this.onBack()
    }


    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return (
            <main className="email-app">
                <EmailNav />
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
                    <div className="message-view-response-icons">
                        <div className="message-response-icon">
                            <i className="ico" data-feather="corner-up-left"></i>
                        </div>
                        <div className="message-response-icon">
                            <i className="ico" data-feather="arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div className="flex space-between back-next-btns">
                    <Link to={`/email/${emailService.getNextEmailId(email.id, -1)}`}> <i class="fas fa-arrow-left"></i></Link>
                    <Link to={`/email/${emailService.getNextEmailId(email.id, 1)}`}><i class="fas fa-arrow-right"></i> </Link>
                </div>
                <button className="btn-mail-list" onClick={this.onBack}><i className="fa fa-envelope "></i></button>
            </main>
        )
    }
}

