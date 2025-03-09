import React from "react";
import styles from "./ReviewForm.module.css";
import rec from "/public/images/rec.jpg";
import Rating from "../Rating/Rating";

const ReviewForm = () => {
  return (
    <section className={styles.review}>
    

       
    <div style="position:absolute;right:0px;background-color:blue;width:25%;height:100px;">
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
    <label>overall matcha rating</label>
    <div className={styles.ratingContainer}>
    <Rating count={5} defaultRating={0} />
    </div>
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
        <div className={styles.buttonContainer}>

        <button className={styles.button}>submit</button>
        </div>
        </div>
        
      </form>
      </div>


    </section>
  );
};

export default ReviewForm;
