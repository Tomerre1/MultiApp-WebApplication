/* Email Service */
import { utilService } from "../util-service.js"
// import { MailData } from "../data/mail.data.js"
import { storageService } from "../storage-service.js"

export const emailService = {
    createEmail,
    query,
    getLoggedInUser,
    getEmailById,
    setIsRead,
    removeEmail
}


const KEY = 'emailsDB'
const emailsFromStorage = storageService.loadFromStorage(KEY)
const gEmails = (emailsFromStorage && emailsFromStorage.length) ? emailsFromStorage : createEmails()

const loggedinUser = { email: 'Tomer & Matan@MultiApp.com', fullName: 'Popo' }

function getLoggedInUser() { return loggedinUser }

function createEmail(id = utilService.makeId(), subject = "Hello There", body = utilService.makeLorem()) {
    return {
        id,
        subject,
        body,
        isRead: Math.random() > 0.5,
        sentAt: utilService.convertDateToFormat(new Date()),
        from: 'Popo',
        to: 'MultiApp@BestApp.com',
        isStarred: false
    }
}

function query(filterBy = null) {
    if (filterBy) {
        let { text, sortRead } = filterBy
        let emailsToShow
        if (sortRead === 'read') emailsToShow = gEmails.filter(email => email.subject.includes(text) && email.isRead)
        else if (sortRead === 'unread') emailsToShow = gEmails.filter(email => email.subject.includes(text) && !email.isRead)
        else emailsToShow = gEmails.filter(email => email.subject.includes(text))
        return Promise.resolve(emailsToShow)
    }
    return Promise.resolve(gEmails)
}

function createEmails() {
    const emails = []
    for (let i = 0; i < 10; i++) {
        emails.push(createEmail());
    }
    storageService.saveToStorage(KEY, emails)
    return emails
}

function getEmailById(emailId) { return Promise.resolve(gEmails.find(email => email.id === emailId)) }

function setIsRead(email) {
    email.isRead = true
    storageService.saveToStorage(KEY, gEmails)
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex(email => { return email.id === emailId })
    gEmails.splice(idx, 1)
    storageService.saveToStorage(KEY, gEmails)
}
