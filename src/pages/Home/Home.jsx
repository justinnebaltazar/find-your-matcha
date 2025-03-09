import { Link } from "react-router";
import styles from "./Home.module.css";
import homepage from "/images/Homepage.jpg";


export const Home = () => {
    return (
        <div className={styles.container}>
           <div className={styles.title}>
                <h1>find your matcha</h1>
           </div>
            <div className={styles.textContainer}>
                <p className={styles.desc}>Step into the world of Matcha and explore its rich, vibrant flavours like never before. Discover 
                    everything from the hottest spots to hidden gem. Click below to get started!
                </p>
            </div>
            <div className={styles.buttonsContainer}>
                <ul className={styles.buttons}>
                    <li>
                        <Link className={styles.links} to="/login">login</Link>
                    </li>
                </ul>
                <ul className={styles.buttons}>
                    <li>
                        <Link className={styles.links} to="/register"> create an account</Link>
                    </li>
                </ul>
            </div>
           
        </div>

    )
}