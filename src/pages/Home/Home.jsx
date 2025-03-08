import { Link } from "react-router";
import styles from "./Home.module.css";

export const Home = () => {
    return (
        <div className={styles.container}>
            <Link to="/register">Register</Link>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    )
}