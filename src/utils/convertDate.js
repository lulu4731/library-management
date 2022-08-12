const convertDate = (date) => {
    date.setDate(date.getDate() + 1)
    const temps = date.toISOString().split('T')[0]
    // console.log(temps)
    date.setDate(date.getDate() - 1)
    return temps
}

export default convertDate