import { useState, useEffect } from "react";
import supabase from "../../helper/supabaseClient";

function MatchaReviews({ placeId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!placeId) {
        console.warn("Missing placeId, skipping fetch.");
      }

      console.log("Received placeId:", placeId);

      const { data, error } = await supabase
        .from("matcha_reviews")
        .select("*")

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        console.log("Fetched reviews:", data);
        setReviews(data);
      }
    };

    fetchReviews();
  }, [placeId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.rating} Stars</strong> - {review.comment}
              <br />
              <em>Location: {review.location}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MatchaReviews;
