import React from 'react'
import styles from "./Review.module.css";
import rec from "/public/images/rec.jpg";

const Review = () => {
  return (


    <section className={styles.review}>
        <form>
            <h2>leave a review</h2>
            <div className={styles.inputbox}>
                <label>name</label>
                <input type="text" className="field" placeholder='please enter your name' required />
                </div>
                <div className={styles.inputbox}>
                <label>message</label>
                <textarea name="" id="" placeholder='enter your message'></textarea>
                </div>
                <button type={styles.submit}>submit</button>
            
        </form>
        
    </section>
   
  );
};

export default Review



