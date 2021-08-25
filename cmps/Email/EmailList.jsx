import { emailService } from "../../services/Email/email.service.js"
import { EmailPreview } from "./EmailPreview.jsx"
import { EmailFilter } from "./EmailFilter.jsx"
export class EmailList extends React.Component {
    state = {
        emails: null
    }

    componentDidMount() {
        this.setState({ emails: this.props.emails });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.emails !== prevProps.emails) {
            this.setState({ emails: this.props.emails });
        }
    }
    
    render() {
        const { emails } = this.state
        if (!emails) return <div> Loading </div>
        return (
            <section className="list">
                <EmailFilter onSetFilter={this.props.onSetFilter}/>
                <div className="mail-list">
                    {emails.map((mail) => {
                        return <EmailPreview key={mail.id} email={mail} onRemoveEmail={this.props.onRemoveEmail} />
                    })}
                </div>
            </section>
        )
    }
}
