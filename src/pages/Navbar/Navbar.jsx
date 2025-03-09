import React from 'react'
import styles from "./Navbar.module.css"
import logo from "/public/images/logo.jpeg"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navLeft}>
            <img src={logo}>
            </img>
       
        </div>
     
        <div className={styles.navCenter}>
            <ul className={styles.navLinks}>
                <li>
                    <a href="/cafes">cafes</a>
                </li>
                <li>
                    <a href="/review">write a review</a>
                </li>
                <li>
                    <a href="/about">about us</a>
                </li>
                <li>
                    <a href="/contact">contact</a>
                </li>
            </ul>
        </div>
      





    </nav>
  )
}

export default Navbar