import { useRef } from "react"
import Webcam from "react-webcam"

function Camera({ onCapture }) {

    const webcamRef = useRef(null)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot()

        if (imageSrc) {
            onCapture(imageSrc)
            console.log("Image captured")
        }
    }

    return (
        <div>

            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
                videoConstraints={{
                    facingMode: "user"
                }}
            />

            <button
                onClick={capture}
                style={{
                    marginTop: "10px",
                    padding: "10px",
                    cursor: "pointer"
                }}
            >
                Capture
            </button>

        </div>
    )
}

export default Camera