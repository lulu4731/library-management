import { toastSuccess } from "../toast/toast"
export const saveDs = (data) => {
    const ds = {
        value: data.isbn,
        label: data.name_book,
        img: data.img,
        price: data.price,
        authors: data.authors,
        category: data.category
    }

    return ds
}

export const saveOrderLocalStorage = (data, id_readers, setOrders) => {
    let temps = JSON.parse((localStorage.getItem(`reader-order-${id_readers}`))) || []
    const ds = saveDs(data)
    const dsExists = temps.find(item => JSON.stringify(item) === JSON.stringify(ds))

    if (dsExists) {
        temps = temps.filter((item) => JSON.stringify(item) !== JSON.stringify(ds))
        toastSuccess('Xóa sách ra khỏi phiếu mượn thành công')
    } else {
        temps.push(ds)
        toastSuccess('Thêm sách vào phiếu mượn thành công')
    }

    localStorage.setItem(`reader-order-${id_readers}`, JSON.stringify(temps))
    setOrders(temps)
}   