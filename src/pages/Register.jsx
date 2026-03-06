import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

    const videoRef = useRef(null)
    const navigate = useNavigate()

    const [images, setImages] = useState([])

    const startCamera = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream

    }

    const captureImage = () => {

        const canvas = document.createElement("canvas")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        const ctx = canvas.getContext("2d")
        ctx.drawImage(videoRef.current, 0, 0)

        const image = canvas.toDataURL("image/jpeg")

        setImages(prev => [...prev, image])

        alert("Image captured")

    }

    const registerUser = async () => {

        if (images.length < 6) {
            alert("Capture at least 6 images")
            return
        }

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "yash",
                images: images
            })
        })

        const data = await res.json()

        if (data.status === "registered") {

            localStorage.setItem("auth", "true")

            alert("Registration successful")

            navigate("/dashboard")

        }

    }

    return (

        <div style={{ textAlign: "center" }}>

            <h2>Face Registration</h2>

            <video ref={videoRef} autoPlay width="400" />

            <br />

            <button onClick={startCamera}>Start Camera</button>

            <br /><br />

            <button onClick={captureImage}>Capture</button>

            <br /><br />

            <p>{images.length} images captured</p>

            <button onClick={registerUser}>Register Face</button>

        </div>

    )

}

export default Register