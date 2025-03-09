import { Link } from "react-router";
import styles from "./Home.module.css";
import homepage from "/images/Homepage.jpg";


export const Home = () => {
    return (
        <div className={styles.container}>
           <h1 className={styles.title}>Find your matcha</h1>
           {/*<img src={homepage}></img>*/}
        </div>

    )
}