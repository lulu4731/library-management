const renewalDate = (date) => {
    date.setDate(date.getDate() + 14)
    const temps = date.toISOString()
    date.setDate(date.getDate() - 1)
    return temps
}

export default renewalDate