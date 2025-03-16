import React from "react";
import styles from "./Navbar.module.css";
import logo from "/public/images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
      <img src={logo} className={styles.logo}></img>
      </div>

      <div className={styles.navCenter}>
        <ul className={styles.navLinks}>
        {location.pathname !== "/" && (<li>
            <Link className={styles.links} to='/'>home</Link>
          </li>)}
          <li>
            <Link className={styles.links} to='/cafes'>cafes</Link>
          </li>
          <li>
            <Link className={styles.links} to='/reviewform'>write a review</Link>
          </li>

          <li>
            <Link className={styles.links} to='/register'>register</Link>
          </li>

          <li>
            <Link className={styles.links} to='/login'>login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
