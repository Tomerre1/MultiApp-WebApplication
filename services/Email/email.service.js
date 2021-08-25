/* Email Service */
import { utilService } from "../util-service.js"
// import { MailData } from "../data/mail.data.js"
import { storageService } from "../storage-service.js"

export const emailService = {
    createEmail,
    query
}


const KEY = 'emailsDB'
const emailsFromStorage = storageService.loadFromStorage(KEY)
let gEmails = (emailsFromStorage && emailsFromStorage.length) ? emailsFromStorage : createEmails()

function createEmail(id = utilService.makeId(), subject, body = utilService.makeLorem()) {
    return {
        id,
        subject,
        body,
        isRead: false,
        sentAt: '12-1-13',
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

