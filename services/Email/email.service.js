/* Email Service */
import { utilService } from "../util-service.js"
import { storageService } from "../storage-service.js"

export const emailService = {
    createEmail,
    query,
    getLoggedInUser,
    getEmailById,
    setIsRead,
    removeEmail,
    setIsStar,
    setIsTrash,
    sortEmails
}


const KEY = 'emailsDB'
const emailsFromStorage = storageService.loadFromStorage(KEY)
const gEmails = (emailsFromStorage && emailsFromStorage.length) ? emailsFromStorage : createEmails()

const loggedinUser = { email: 'Tomer & Matan@MultiApp.com', fullName: 'Popo' }

function getLoggedInUser() { return loggedinUser }

function createEmail(id = utilService.makeId(), subject = utilService.makeLorem(10), body = utilService.makeLorem()) {
    return {
        id,
        subject,
        body,
        isRead: Math.random() > 0.5,
        sentAt: Date.now(),
        from: 'Popo',
        to: 'MultiApp@BestApp.com',
        isStar: false,
        isTrash: false
    }
}

function query(filterBy = null, sortBy = null) {
    if (sortBy) sortEmails(sortBy)
    if (filterBy) {
        let { text, isRead, isStar, isTrash } = filterBy
        let emailsToShow
        if (isStar)
            emailsToShow = gEmails.filter(email => email.subject.includes(text) && email.isStar && !email.isTrash) 
        else if (isTrash)
            emailsToShow = gEmails.filter(email => email.subject.includes(text) && email.isTrash)
        else if (isRead)
            emailsToShow = gEmails.filter(email => email.subject.includes(text) && email.isRead && !email.isTrash)
        else if (!isRead && isRead !== null)
            emailsToShow = gEmails.filter(email => email.subject.includes(text) && !email.isRead && !email.isTrash)
        else
            emailsToShow = gEmails.filter(email => email.subject.includes(text) && !email.isTrash)
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
    gEmails[idx].isTrash = !gEmails[idx].isTrash
    storageService.saveToStorage(KEY, gEmails)
}

function setIsStar(email) {
    email.isStar = !email.isStar
    storageService.saveToStorage(KEY, gEmails)
}

function setIsTrash(email) {
    email.isTrash = !email.isTrash
    storageService.saveToStorage(KEY, gEmails)
}

function sortEmails(sortBy) {
    switch (sortBy) {
        case 'date':
            sortByDate()
            break;
        case 'subject':
            sortBySubject()
        default:
            break;
    }
}
function sortByDate(emails, sortTypeByIcon = null) {
    debugger
    gEmails.sort(function (a, b) {
        return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    });
}


function sortBySubject(emails, sortTypeByIcon = null) {
    return gEmails.sort(function (a, b) {
        return a.subject.localeCompare(b.subject, "en", { sensitivity: 'variant' })
    });

}