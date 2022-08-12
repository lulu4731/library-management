import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"

const NotFound = () => {
    let navigate = useNavigate()
    const handleClick = () => {
        navigate(-1)
    }
    const myStyle = {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10rem",
    }
    return (
        <div>
            <img
                src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                alt="not-found"
                className="not-found shadow"
                style={myStyle}
            />
            <div className="text-center">
                <Button variant="warning mt-3" onClick={handleClick}>
                    GO BACK
                </Button>
            </div>
        </div>
    )
}

export default NotFound