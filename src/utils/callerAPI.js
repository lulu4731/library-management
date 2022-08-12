import axios from "axios"
import * as types from '.././contains/type'

export const loginUser = async (loginForm) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v0/librarian/login",
            loginForm
        )
        if (response.status === 200) {
            localStorage.setItem(
                types.LOCAL_STORAGE_TOKEN_NAME,
                response.data.accessToken
            )
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}
// export const changePasswordUser = async (changePass: ChangePass) => {
//     try {
//         const password = changePass.password
//         const response = await axios.put(
//             `http://localhost:8000/api/v0/user/change-pass/${changePass.id_user}`,
//             { password }
//         )
//         if (response.status === 200) {
//             return await { ...response.data, status: response.status }
//         }
//     } catch (error: any) {
//         if (error.response.data) return error.response.data
//         else return { message: error.message }
//     }
// }