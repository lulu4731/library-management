import { send } from "emailjs-com"
import { toastSuccess } from "../toast/toast"

export const sendEmail = (data) => {
    const email = {
        from_name: "",
        to_name: data.email,
        real_name: data.real_name,
        content: data.content,
        handle: data.handle,
        reply_to: "",
    }
    send(
        "service_dukxn3m",
        "template_feedback_reader",
        email,
        "sGtIKVX-3KqLsed8L"
    )
        .then((response) => {
            toastSuccess('Trả lời phản hồi thành công')
        })
        .catch((err) => {
            console.log("FAILED...", err)
        })
}

export const sendEmailLock = (data) => {
    const email = {
        from_name: "",
        to_name: data.email,
        real_name: data.real_name,
        lock_type: data.lock_type,
        reason: data.reason,
        reply_to: "",
    }
    send(
        "service_dukxn3m",
        "template_lock_user",
        email,
        "sGtIKVX-3KqLsed8L"
    )
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text)
        })
        .catch((err) => {
            console.log("FAILED...", err)
        })
}

export const sendEmailPendingBorrow = (data) => {
    // console.log(data)
    const email = {
        to_name: data.to_name,
        real_name: data.real_name,
        books: data.books,
        arrival_date: data.arrival_date,
        expired: data.expired,
        reply_to: "",
    }
    send(
        "service_25m1ohf",
        "template_pending_borrow",
        email,
        "o2exrn3tssY_9taxR"
    )
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text)
        })
        .catch((err) => {
            console.log("FAILED...", err)
        })
}

export const sendEmailCreateLibrary = (data) => {
    const email = {
        to_name: data.to_name,
        real_name: data.real_name,
        email: data.email
    }
    send(
        "service_25m1ohf",
        "template_crete_librarian",
        email,
        "o2exrn3tssY_9taxR"
    )
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text)
        })
        .catch((err) => {
            console.log("FAILED...", err)
        })
}