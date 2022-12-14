import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/img/log.svg'
import register from '../../assets/img/register.svg'
import { forgetPassword, forgetPasswordChange, loginUser, registerUser } from '../../utils/callerAPI';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { checkLogin, setSignIn } from '../../reducers/librarian';
import { toastError, toastSuccess } from '../../toast/toast';
import { Button } from 'react-bootstrap';

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const [register, setRegister] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        citizen_identification: '',
        password: '',
        confirm_pass: ''
    })
    const { email, password } = login

    const [forgetPass, setForgetPass] = useState({
        email: '',
        code: '',
        new_pass: '',
        confirm_pass: ''
    })

    const [form, setForm] = useState('register')
    const [code, setCode] = useState(false)
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

    const handleChangeValueChangePass = (keyValue, keyName) => {
        const changePass = { ...forgetPass }
        changePass[keyName] = keyValue
        setForgetPass(changePass)
    }

    const onSubmitSignIn = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(login)
            if (response.status === 200) {
                toastSuccess(response.message)
                dispatch(setSignIn())
                dispatch(checkLogin())
                // navigate('/statistical')
            } else {
                toastError(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitChangePass = async (e) => {
        e.preventDefault()
        if (forgetPass.email && forgetPass.code && forgetPass.new_pass && forgetPass.confirm_pass) {
            if (forgetPass.new_pass === forgetPass.confirm_pass) {
                const response = await forgetPasswordChange(forgetPass)
                if (response.status === 200) {
                    toastSuccess(response.message)
                    onSignIn()
                    setCode(false)
                    setForgetPass({
                        email: '',
                        code: '',
                        new_pass: '',
                        confirm_pass: ''
                    })
                } else {
                    toastError(response.message)
                }
            } else {
                toastError('M???t kh???u v?? nh???p l???i m???t kh???u m???i kh??ng tr??ng nhau')
            }
        } else {
            if (code) {
                toastError("B???n h??y nh???p ?????y ????? th??ng tin")
            } else {
                const response = await forgetPassword(forgetPass)
                if (response.status === 200) {
                    setCode(true)
                    toastSuccess(response.message)
                } else {
                    toastError(response.message)
                }
            }
        }
    }

    const handleChangeValueRegister = (keyValue, keyName) => {
        const newRegister = { ...register }
        newRegister[keyName] = keyValue
        setRegister(newRegister)
    }

    const onSubmitSignUp = async (e) => {
        e.preventDefault()
        try {
            const response = await registerUser(register)
            if (response.status === 201) {
                toastSuccess(response.message)
                onSignIn()
            } else {
                toastError(response.message)
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
                        <h2 className="title-sign">????ng nh???p</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => handleChangeValue(e.target.value, 'email')} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => handleChangeValue(e.target.value, 'password')} />
                        </div>
                        <button type="submit" className="btn-sign solid">????ng nh???p</button>
                        <div>
                            <p className="social-text">N???u b???n qu??n m???t kh???u? <Button variant='info' onClick={() => {
                                onSignUp()
                                setForm('changePass')
                            }}>L???y l???i m???t kh???u</Button></p>
                        </div>
                    </form>
                    {
                        form === 'register' ? (
                            <form action="#" className="sign-up-form" onSubmit={onSubmitSignUp}>
                                <h2 className="title-sign">????ng k??</h2>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="H???" name='first_name' value={register.first_name} onChange={(e) => handleChangeValueRegister(e.target.value, 'first_name')} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="T??n" name='last_name' value={register.last_name} onChange={(e) => handleChangeValueRegister(e.target.value, 'last_name')} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="CMND" name='citizen_identification' value={register.citizen_identification} onChange={(e) => handleChangeValueRegister(e.target.value, 'citizen_identification')} />
                                </div>
                                <div className="input-field">
                                    <i className="fa-solid fa-phone"></i>
                                    <input type="text" placeholder="S??? ??i???n tho???i" name='phone' value={register.phone} onChange={(e) => handleChangeValueRegister(e.target.value, 'phone')} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-envelope"></i>
                                    <input type="text" placeholder="Email" name='email' value={register.email} onChange={(e) => handleChangeValueRegister(e.target.value, 'email')} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Password" name='password' value={register.password} onChange={(e) => handleChangeValueRegister(e.target.value, 'password')} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Password Confirm" name='confirm_pass' value={register.confirm_pass} onChange={(e) => handleChangeValueRegister(e.target.value, 'confirm_pass')} />
                                </div>
                                <button type="submit" className="btn-sign solid">????ng k??</button>
                            </form>
                        ) : (
                            <form action="#" className="sign-up-form" onSubmit={onSubmitChangePass}>
                                <h2 className="title-sign">Qu??n m???t kh???u</h2>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Email" value={forgetPass.email} onChange={(e) => handleChangeValueChangePass(e.target.value, 'email')} />
                                </div>
                                {
                                    code && (
                                        <>
                                            <div className="input-field">
                                                <i className="fas fa-envelope"></i>
                                                <input type="password" placeholder="Code" value={forgetPass.code} onChange={(e) => handleChangeValueChangePass(e.target.value, 'code')} />
                                            </div>
                                            <div className="input-field">
                                                <i className="fas fa-lock"></i>
                                                <input type="password" placeholder="M???t kh???u" value={forgetPass.new_pass} onChange={(e) => handleChangeValueChangePass(e.target.value, 'new_pass')} />
                                            </div>
                                            <div className="input-field">
                                                <i className="fas fa-lock"></i>
                                                <input type="password" placeholder="Nh???p l???i m???t kh???u" value={forgetPass.confirm_pass} onChange={(e) => handleChangeValueChangePass(e.target.value, 'confirm_pass')} />
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    !code ? (
                                        <input type="submit" className="btn-sign" value="L???y code" />
                                    ) : (<input type="submit" className="btn-sign" value="Thay ?????i" />)
                                }
                            </form>
                        )
                    }

                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Ch??o m???ng b???n ?????n v???i ph???n m???m qu???n l?? th?? vi???n</h3>
                        <p>
                            H??y ????ng k?? n???u ch??a c?? t??i kho???n
                        </p>
                        <button className="btn-sign transparent" id="sign-up-btn" onClick={() => {
                            onSignUp()
                            setForm('register')
                            setForgetPass({
                                email: '',
                                code: '',
                                new_pass: '',
                                confirm_pass: ''
                            })
                        }}>
                            ????ng k??
                        </button>
                    </div>
                    <img src={logo} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Ch??o m???ng b???n ?????n v???i ph???n m???m qu???n l?? th?? vi???n</h3>
                        <p>
                            N???u ???? c?? t??i kho???n h??y ????ng nh???p ngay
                        </p>
                        <button className="btn-sign transparent" id="sign-in-btn" onClick={() => {
                            onSignIn()
                            setCode(false)
                            setForgetPass({
                                email: '',
                                code: '',
                                new_pass: '',
                                confirm_pass: ''
                            })
                        }}>
                            ????ng nh???p
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage