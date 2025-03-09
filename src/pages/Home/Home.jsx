import { Link } from "react-router";
import styles from "./Home.module.css";

const Circle = ({ position }) => {
    return <div className={styles.circles} style={position}></div>
}
export const Home = () => {
    return (
        <div className={styles.container}>
            <Circle position={{marginLeft: "50px", marginTop:"50px"}}></Circle>
        </div>
    )
}