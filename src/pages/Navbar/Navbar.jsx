import React from "react";
import styles from "./Navbar.module.css";
import logo from "/public/images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
      <img src={logo}></img>
      </div>

      <div className={styles.navCenter}>
        <ul className={styles.navLinks}>
          <li>
            <Link to='/cafes'>cafes</Link>
          </li>
          <li>
            <Link to='/reviewform'>write a review</Link>
          </li>

          <li>
            <Link to='/register'>register</Link>
          </li>

          <li>
            <Link to='/login'>login</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
