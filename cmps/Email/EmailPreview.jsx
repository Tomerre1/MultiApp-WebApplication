
import { emailService } from "../../services/Email/email.service.js"
export function EmailPreview({ email }) {
    return (
        <div className="mail-preview flex space-between align-items" >
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
    )
}

