import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container-home">
                    <div className="grid-4">
                        <div className="grid-4-col footer-about">
                            <h3 className="title-sm">Thông tin</h3>
                            <p className="text">
                                Website quản lý thư viện Học Viện Công Nghệ Bưu Chính Viễn Thông
                            </p>
                        </div>

                        <div className="grid-4-col footer-links">
                        </div>

                        <div className="grid-4-col footer-links">
                        </div>

                        <div className="grid-4-col footer-newstletter">
                            <h3 className="title-sm">Liên hệ</h3>
                            <p className="text">
                                Mọi thông tin vui lòng liên hệ với chúng tôi qua các địa chỉ sau
                            </p>
                            <p className="text">
                                Email: dangnguyen0401@gmail.com
                            </p>
                            <p className="text">
                                SDT: 0327876080
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer