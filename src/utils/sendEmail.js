import { send } from "emailjs-com"

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
            console.log("SUCCESS!", response.status, response.text)
        })
        .catch((err) => {
            console.log("FAILED...", err)
        })
}