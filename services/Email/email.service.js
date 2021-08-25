/* Email Service */
import { utilService } from "../util-service.js"
// import { MailData } from "../data/mail.data.js"
import { storageService } from "../storage-service.js"

export const emailService = {
    createEmail,
    query,
    getLoggedInUser,
    getEmailById,
    setIsRead
}


const KEY = 'emailsDB'
const emailsFromStorage = storageService.loadFromStorage(KEY)
const gEmails = (emailsFromStorage && emailsFromStorage.length) ? emailsFromStorage : createEmails()

const loggedinUser = { email: 'Tomer & Matan@MultiApp.com', fullName: 'Popo' }

function getLoggedInUser() { return loggedinUser }

function createEmail(id = utilService.makeId(), subject, body = utilService.makeLorem()) {
    return {
        id,
        subject,
        body,
        isRead: Math.random() > 0.5,
        sentAt: utilService.convertDateToFormat(new Date()),
        to: 'MultiApp@BestApp.com'
    }
}

function query(filterBy = null) {
    if (filterBy) {
        // let { title, price } = filterBy
        // price = price ? price : Infinity
        // const bookToShow = gBooks.filter(book => book.title.includes(title) && book.listPrice.amount <= price)
        // return Promise.resolve(bookToShow)
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