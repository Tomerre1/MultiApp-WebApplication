import { emailService } from '../../services/Email/email.service.js'
import { eventBusService } from '../../services/event-bus-service.js'

export class EmailAdd extends React.Component {
    state = {
        newMail: {
            subject:'',
            body:''
        }
    }

    componentDidMount() {
        this.setState({ newMail: this.props.newMail })
        console.log('%c  this.state.newMail:', 'color: #0e93e0;background: #aaefe5;', this.state.newMail);
    }

    closeModal = () => {
        this.props.toggleCompose()
    }



    handleChange = (e) => {
        const value = e.target.value;
        const newMail = { ...this.state.newMail, [e.target.name]: value }
        this.setState({ newMail })
        console.log(1)
    }

    onSubmitMail = (e) => {
        e.preventDefault()
        emailService.addMail(this.state.newMail)
        eventBusService.emit('unReadCount', 1)
        this.props.toggleCompose()
    }

    render() {
        debugger;
        const { subject,body } = this.state.newMail
        return (
            <section className="modal-compose-email">
                <button className="closeModal" onClick={this.props.toggleCompose}>&times;</button>
                <form className="compose-email flex" onSubmit={this.onSubmitMail} >
                    <h2 className="mail-title"> Compose </h2>
                    <div className="mail-to flex-column">
                        <input autoFocus id="to" name="to" onChange={this.handleChange} type="email" placeholder="Enter email" required />
                    </div>
                    <div className="mail-subject flex-column">
                        <input value={subject} onChange={this.handleChange} id="subject" name="subject" type="text" placeholder="Enter subject" required />
                    </div>
                    <div className="mail-body flex-column">
                        <textarea value={body} onChange={this.handleChange} type="text" name="body" id="textarea" placeholder='Enter Text' rows="7" cols="50" required /><br />
                    </div>
                    <div className="add-mail-btn-container">
                        <button type="submit" className="add-mail-btn send"><i className="far fa-paper-plane" aria-hidden="true"></i></button>
                        <button onClick={this.props.toggleCompose} className="add-mail-btn remove"><i className="far fa-trash-alt" aria-hidden="true"></i></button>
                    </div>
                </form>
            </section>
        )
    }
}
