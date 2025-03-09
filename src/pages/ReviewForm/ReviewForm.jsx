import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import supabase from "../../helper/supabaseClient";
import Rating from "../Rating/Rating";

const ReviewForm = ({ placeId }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null); // Ensure it's null initially
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    if (!name.trim() || rating === null || !comment.trim()) {
      alert("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    // Insert review into Supabase
    const { data, error } = await supabase.from("matcha_reviews").insert([
      {
        place_id: placeId, // Ensure this is not undefined
        location: "Unknown", // Update this if you have location data
        rating,
        vibes: rating, // Assuming vibes are the same as rating
        comment,
      },
    ]);

    if (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } else {
      console.log("Review submitted:", data);
      setSuccess(true);
      setName("");
      setRating(null); // Reset rating
      setComment("");
    }

    setLoading(false);
  };

  return (
    <section className={styles.review}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <h2>Leave a Review</h2>

       
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
            <label>Overall Matcha Rating</label>
            <div className={styles.ratingContainer}>
              <Rating count={5} selectedRating={rating} onRatingChange={setRating} />
            </div>
          </div>

          <div className={styles.input}>
            <label>Message</label>
            <textarea
              className={styles.inputField}
              placeholder="Enter your message"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {success && <p className={styles.successMessage}>Review submitted successfully!</p>}
        </div>
      </form>
<<<<<<< HEAD
=======
      </div>


>>>>>>> 346aa72e89ea1a099757a365b793c59928265945
    </section>
  );
};

export default ReviewForm;
