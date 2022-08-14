const convertTimesTamp = (timestamp) => {

    timestamp = timestamp.toString().split('T')[0]
    const date = new Date(timestamp)
    date.setDate(date.getDate() + 1)
    const temps = date.toISOString().split('T')[0]
    date.setDate(date.getDate() - 1)
    return temps
}

export default convertTimesTamp