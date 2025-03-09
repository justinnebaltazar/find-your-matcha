import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import supabase from "../../helper/supabaseClient";
import Rating from "../Rating/Rating";

const ReviewForm = ({ placeId }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || rating === null || !comment.trim()) {
      alert("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("matcha_reviews").insert([
      {
        place_id: placeId,
        location: "Unknown",
        rating,
        vibes: rating, // temporary - should be its separate value
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
      setRating(null);
      setComment("");
    }

    setLoading(false);
  };

  return (
    <section className={styles.review}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Leave a Review</h2>

        <div className={styles.input}>
          <label>Name</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
      </form>
    </section>
  );
};

export default ReviewForm;
