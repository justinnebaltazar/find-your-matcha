import { Link } from "react-router"

export const Home = () => {
    return (
        <div>
            <Link to="/register">Register</Link>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    )
}