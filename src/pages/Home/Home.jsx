import { Link } from "react-router";
import styles from "./Home.module.css";
import homepage from "/images/Homepage.jpg";


export const Home = () => {
    return (
        <div className={styles.container}>
           <div className={styles.title}>
                <h1>find your matcha</h1>
           </div>
           <br></br>
            <div className={styles.textContainer}>
                <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minus voluptatum velit quae asperiores, labore esse iste mollitia consequatur praesentium corrupti eum suscipit, fugiat, harum aliquid necessitatibus magni quasi reprehenderit!</p>
            </div>
            <div className={styles.buttonsContainer}>
                <ul className={styles.buttons}>
                    <li>
                        <Link to="/link">log in</Link>
                        </li>
                    </ul>
                <ul className={styles.buttons}>
                    <li>
                        <Link to="/register"> create an account</Link>
                    </li>
                </ul>
            </div>
           
        </div>

    )
}