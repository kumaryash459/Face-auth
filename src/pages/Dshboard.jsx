import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {

        const checkAuth = async () => {

            const res = await fetch("http://localhost:5000/check-auth", {
                credentials: "include"
            })

            const data = await res.json()

            if (!data.authenticated) {
                navigate("/")
            }

        }

        checkAuth()

    }, [])

    const logout = async () => {

        await fetch("http://localhost:5000/logout", {
            credentials: "include"
        })

        navigate("/")

    }

    return (

        <div style={{ textAlign: "center", marginTop: "100px" }}>

            <h1>Welcome to Dashboard</h1>

            <p>You are successfully authenticated</p>

            <button onClick={logout}>Logout</button>

        </div>

    )
}

export default Dashboard