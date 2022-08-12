import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import logo from '../../assets/img/log.svg'
import register from '../../assets/img/register.svg'
import { loginUser } from '../../utils/callerAPI';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setSignIn } from '../../reducers/librarian';

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const { email, password } = login

    const onSignUp = () => {
        document.querySelector(".container").classList.add("sign-up-mode");
    }

    const onSignIn = () => {
        document.querySelector(".container").classList.remove("sign-up-mode");
    }

    const handleChangeValue = (keyValue, keyName) => {
        const newLogin = { ...login }
        newLogin[keyName] = keyValue
        setLogin(newLogin)
    }

    const onSubmitSignIn = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(login)
            console.log(response)
            if (response.status === 200) {
                // toastSuccess(response.message)
                dispatch(setSignIn())
                navigate('/readers')
            } else {
                console.log(response)
                // toastError(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={onSubmitSignIn}>
                        <h2 className="title-sign">Đăng nhập</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => handleChangeValue(e.target.value, 'email')} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => handleChangeValue(e.target.value, 'password')} />
                        </div>
                        <button type="submit" className="btn-sign solid">Đăng nhập</button>
                        <div>
                            <p className="social-text">Nếu bạn quên mật khẩu? <Link to="/login">Lấy lại mật khẩu</Link></p>
                        </div>
                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title-sign">Đăng ký</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password Confirm" />
                        </div>
                        <input type="submit" className="btn-sign" value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Chào mừng bạn đến với phần mềm quản lý thư viện</h3>
                        <p>
                            Hãy đăng ký nếu chưa có tài khoản
                        </p>
                        <button className="btn-sign transparent" id="sign-up-btn" onClick={onSignUp}>
                            Đăng ký
                        </button>
                    </div>
                    <img src={logo} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Chào mừng bạn đến với phần mềm quản lý thư viện</h3>
                        <p>
                            Nếu đã có tài khoản hãy đăng nhập ngay
                        </p>
                        <button className="btn-sign transparent" id="sign-in-btn" onClick={onSignIn}>
                            Đăng nhập
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage