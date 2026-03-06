import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()

    return (
        <div style={{ textAlign: "center", marginTop: "120px" }}>

            <h1>Face Authentication System</h1>

            <div style={{ marginTop: "40px" }}>

                <button
                    onClick={() => navigate("/register")}
                    style={{
                        padding: "12px 25px",
                        marginRight: "20px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Signup
                </button>

                <button
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "12px 25px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </div>

        </div>
    )
}

export default Home