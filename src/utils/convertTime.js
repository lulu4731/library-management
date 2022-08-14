const convertTime = (str) => {
    const [day, month, year] = str.split('/')
    const date = new Date(+year, +month - 1, +day)

    return date
}

export default convertTime