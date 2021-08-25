const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { EmailNav } from "../../cmps/Email/EmailNav.jsx"
import { EmailList } from "../../cmps/Email/EmailList.jsx"
import { emailService } from "../../services/Email/email.service.js"
import { EmailDetails } from "./EmailDetails.jsx"
import { eventBusService } from "../../services/event-bus-service.js"
export class EmailApp extends React.Component {
    state = {
        emails: null,
        isDetailsShown: false,
    }
    

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then((emails) => {
            this.setState({ emails });
        });
    }

    render() {
        const { emails } = this.state
        if (!emails) return <div>Loading..</div>
        console.log(this.state.isDetailsShown)
        return (
            <main className="email-app">
                <EmailNav />
                <div className="email-container flex">
                    <EmailList emails={emails} />
                </div>
            </main>
        )
    }
}
