import {emailService} from '../../services/Email/email.service.js'

export class EmailAdd extends React.Component {
    state = {
        newMail: null
    }

    componentDidMount() {
        this.setState({newMail: {}})
    }

    closeModal = () => {
        this.props.toggleCompose()
    }



    handleChange = (e) => {
        const value = e.target.value;
        const newMail = { ...this.state.newMail, [e.target.name]: value }
        this.setState({ newMail })
    }

    onSubmitMail = (e) => {
        e.preventDefault()
        emailService.addMail(this.state.newMail)
        this.props.toggleCompose()
    }

    render() {
        return (
            <section className="modal-compose-email">
                <button className="closeModal" onClick={this.props.toggleCompose}>&times;</button>
                <form className="compose-email flex" onSubmit={this.onSubmitMail} >
                    <h2> Compose </h2>
                    <div className="mail-to flex-column">
                        <label htmlFor="to">To</label>
                        <input autoFocus id="to" name="to" onChange={this.handleChange} type="text" placeholder="Enter email" required />
                    </div>
                    <div className="mail-subject flex-column">
                        <label htmlFor="subject">Subject</label>
                        <input onChange={this.handleChange} id="subject" name="subject" type="text" placeholder="Enter subject" required />
                    </div>
                    <div className="mail-body flex-column">
                        <label htmlFor="body">Message</label>
                        <textarea onChange={this.handleChange} type="text" name="body" id="textarea" placeholder='Enter Text' rows="7" cols="50" required /><br />
                    </div>
                    <div className="add-mail-btn-container">
                        <button className="add-mail-btn-send"><i className="far fa-paper-plane" aria-hidden="true"></i></button>
                        <button className="add-mail-btn-remove"><i className="far fa-trash-alt" aria-hidden="true"></i></button>
                    </div>

                    <button className="btn">Add Review</button>
                </form>
            </section>


        )
    }
}
{/* <input className="search-list" name="text" value={text} onChange={this.handleChange} type="search" placeholder='Search a mail' /> */}
