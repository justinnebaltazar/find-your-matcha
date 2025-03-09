import React from "react";
import styles from "./ReviewForm.module.css";
import rec from "/public/images/rec.jpg";

const ReviewForm = () => {
  return (
    <section className={styles.review}>
        
      <form>
      <div className={styles.form}>
       
        <h2>leave a review</h2>
        <div className={styles.input}>
          <label>name</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="please enter your name"
            required
          />
        </div>
        <div className={styles.input}>

          <label>message</label>
          <textarea
            name=""
            id=""
            className={styles.inputField}
            placeholder="enter your message"
          ></textarea>
    
        </div>
        <button className={styles.button}>submit</button>
        </div>
        
      </form>

    </section>
  );
};

export default ReviewForm;
