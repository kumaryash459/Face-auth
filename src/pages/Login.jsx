import { useRef } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

    const videoRef = useRef(null)
    const navigate = useNavigate()

    const startCamera = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true })

        videoRef.current.srcObject = stream

    }

    const captureFrame = () => {

        const canvas = document.createElement("canvas")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        const ctx = canvas.getContext("2d")

        ctx.drawImage(videoRef.current, 0, 0)

        return canvas.toDataURL("image/jpeg")

    }

    const startLogin = async () => {

        alert("Blink or move your head")

        let verified = false

        for (let i = 0; i < 6; i++) {

            const image = captureFrame()

            const res = await fetch("http://localhost:5000/liveness", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ image })

            })

            const data = await res.json()

            if (data.status === "verified") {
                verified = true
                break
            }

            await new Promise(r => setTimeout(r, 1000))

        }

        if (!verified) {

            alert("Liveness failed")

            return

        }

        const image = captureFrame()

        const res = await fetch("http://localhost:5000/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ image })

        })

        const data = await res.json()

        if (data.success) {

            alert("Login Successful")

            navigate("/dashboard")

        }
        else {

            alert("Face not recognised")

        }

    }

    return (

        <div style={{ textAlign: "center" }}>

            <h2>Face Login</h2>

            <video
                ref={videoRef}
                autoPlay
                width="400"
            />

            <br />

            <button onClick={startCamera}>
                Start Camera
            </button>

            <br /><br />

            <button onClick={startLogin}>
                Login
            </button>

        </div>

    )

}

export default Login