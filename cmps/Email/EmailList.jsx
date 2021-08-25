import { emailService } from "../../services/Email/email.service.js"
import { EmailPreview } from "./EmailPreview.jsx"
export class EmailList extends React.Component {
    state = {
        emails: null
    }


    componentDidMount() {
        this.loadEmails();
    }

    loadEmails() {
        emailService.query().then((emails) => {
            this.setState({ emails });
        });
    }

    render() {
        const { emails } = this.state
        if (!emails) return <div> Loading </div>
        return (
            <section className="list">
                <div className="search-list flex">
                    <input type="search" placeholder='Search a mail' />
                </div>
                <div className="mail-list">
                    {emails.map((mail) => {
                        return <EmailPreview key={mail.id} email={mail} />
                    })}
                </div>
            </section>
        )
    }
}
