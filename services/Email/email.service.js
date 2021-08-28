/* Email Service */
import { utilService } from "../util-service.js"
import { storageService } from "../storage-service.js"

export const emailService = {
    createEmail,
    query,
    getLoggedInUser,
    getEmailById,
    toggleIsRead,
    setRead,
    removeEmail,
    setIsStar,
    setIsTrash,
    sortEmails,
    addMail,
    getNextEmailId,
    getUnreadEmailsCount

}


const KEY = 'emailsDB'
const emailsFromStorage = storageService.loadFromStorage(KEY)
const gEmails = (emailsFromStorage && emailsFromStorage.length) ? emailsFromStorage : createEmails()

const loggedinUser = { email: 'Tomer_Matan@MultiApp.com', fullName: 'Tomer&Matan' }

function getLoggedInUser() { return loggedinUser }

function createEmail(id = utilService.makeId(), subject = utilService.makeLorem(5), body = utilService.makeLorem(),
    isRead = Math.random() > 0.5, sentAt = utilService.randomDate(), from = 'Tomer&Matan', to = 'Tomer&Matan', isStar = false, status = "inbox") {
    return {
        id,
        subject,
        body,
        isRead,
        sentAt,
        from,
        to,
        isStar,
        status,
    }
}


function query(filterBy = null, sortBy = null) {
    if (sortBy) sortEmails(sortBy)
    if (filterBy) {
        const { text, isRead, isStar, status } = filterBy
        let emailsToShow
        if (status === 'sent')
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && email.status === status))
        else if (status === 'trash')
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && email.status === status))
        else if (status === 'inbox')
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && email.status === status))
        else if (isStar)
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && email.isStar && email.status !== 'trash'))
        else if (isRead)
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && email.isRead && email.status !== 'trash'))
        else if (!isRead && isRead !== null)
            emailsToShow = gEmails.filter(email => (email.subject.includes(text) && !email.isRead && email.status !== 'trash'))
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

function toggleIsRead(email) {
    email.isRead = !email.isRead
    storageService.saveToStorage(KEY, gEmails)
}
function setRead(email) {
    email.isRead = true
    storageService.saveToStorage(KEY, gEmails)
}

function removeEmail(emailId) {
    const idx = gEmails.findIndex(email => { return email.id === emailId })
    if (gEmails[idx].status === 'trash') gEmails.splice(idx, 1)
    else gEmails[idx].status = 'trash'
    storageService.saveToStorage(KEY, gEmails)
}

function setIsStar(email) {
    email.isStar = !email.isStar
    storageService.saveToStorage(KEY, gEmails)
}

function setIsTrash(email) {
    email.status = 'trash' 
    storageService.saveToStorage(KEY, gEmails)
}

function sortEmails(sortBy) {
    switch (sortBy.value) {
        case 'numeric':
            sortByDate(sortBy.numeric)
            break;
        case 'alpha':
            sortBySubject(sortBy.alpha)
        default:
            break;
    }
}

function sortByDate(isNumericUp) {
    if (isNumericUp) {
        gEmails.sort(function (a, b) {
            return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        });
    } else {
        gEmails.sort(function (a, b) {
            return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        });
    }
}

function sortBySubject(isAlphaUp) {
    if (isAlphaUp) {
        gEmails.sort(function (a, b) {
            return a.subject.localeCompare(b.subject, "en", { sensitivity: 'variant' })
        });
    } else {
        gEmails.sort(function (a, b) {
            return b.subject.localeCompare(a.subject, "en", { sensitivity: 'variant' })
        });
    }
}


function addMail(email) {
    gEmails.unshift(createEmail(utilService.makeId(), email.subject, email.body, false, Date.now(), 'Tomer_Matan@MultiApp.com', email.to, false, 'sent'));
    storageService.saveToStorage(KEY, gEmails)
}

function getNextEmailId(emailId, diff) {
    const emailIdx = gEmails.findIndex(email => email.id === emailId);
    let nextEmailId = emailIdx + diff;
    if (nextEmailId === gEmails.length) nextEmailId = 0;
    else if (nextEmailId < 0) nextEmailId = gEmails.length - 1;
    return gEmails[nextEmailId].id;
}

function getUnreadEmailsCount() {
    return gEmails.filter(email => !email.isRead).length;
}

