/*MAIL DATA*/
import { emailService } from "../Email/email.service.js";
import { storageService } from "../storage-service.js"

export const MailData = {
    createEmails,
}

function createEmails() {
    const gEmails = [];
    for (let i = 0; i < 10; i++) {
        gEmails.push(emailService.createEmail());
    }
    storageService.saveToStorage(KEY, gEmails)
    return gEmails
}

