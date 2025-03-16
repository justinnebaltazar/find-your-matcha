import React, { useState, useEffect } from "react";
import styles from "./ReviewForm.module.css";
import supabase from "../../helper/supabaseClient";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ placeId }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null);
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [matchaPlaces, setMatchaPlaces] = useState([]);
  const navigate = useNavigate();
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null); 
  const [username, setUsername] = useState(null);

  // Fetch the currently logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user); // Store user if logged in
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
        const { data, error } = await supabase.from("matcha_places").select("id, name");
        if (error) console.error("Error fetching places:", error);
        else setMatchaPlaces(data);
    };
    fetchPlaces();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const results = matchaPlaces.filter(place => 
        place.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlaces(results);
    } else {
      setFilteredPlaces([]);
    }
  }

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setSearch(place.name);
    setFilteredPlaces([]); // hides dropdown after selection
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedPlace) {
      alert("Please select a matcha place.")
      return;
    }

    // Prevent submission if no user is logged in
    if (!user) {
      alert("You must be logged in to leave a review.");
      navigate("/login"); // Redirect to login page
      setLoading(false);
      return;
    }

    // Ensure all fields are filled
    if (!name.trim() || !comment.trim()) {
      alert("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    // Insert review into Supabase database
    const { data, error } = await supabase.from("matcha_reviews").insert([
      {
        user_id: user.id, // Store the user who posted the review
        place_id: selectedPlace.id,
        location: location,
        rating,
        vibes: rating, // Temporary - should be a separate value
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
      setSearch("");
      setSelectedPlace(null);
    }
    
    setLoading(false);
  };

  return (
    <section className={styles.review}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Leave a Review</h2>

        {/* Show login message if user is not logged in */}
        {!user && <p className={styles.warning}>You must be logged in to submit a review.</p>}
        {/* Logout of an account on click */}

        {user && <p> Logout </p>}
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
          <label>Location</label>
          <input
            type="text"
            className={styles.inputField}
          
            placeholder="Enter the matcha cafe you visited..."
            value={search}
            onChange={handleSearch}
            required
          />
          {filteredPlaces.length > 0 && (
            <ul>
                {filteredPlaces.map(place => (
                  <li key={place.id} onClick={() => handleSelectPlace(place)}>
                    {place.name}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className={styles.input}>
          <label>Overall Matcha Rating:</label>
          <div className={styles.ratingContainer}>
            <Rating count={5} selectedRating={rating} onRatingChange={setRating} />
          </div>
        </div>

        <div className={styles.input}>
          <label>Comments</label>
          <textarea
            className={styles.inputField}
            placeholder="Enter your comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit" disabled={loading || !user}>
            {loading ? "Submitting..." : user ? "Submit" : "Login to Review"}
          </button>
        </div>

        {success && <p className={styles.successMessage}>Review submitted successfully!</p>}
      </form>
    </section>
  );
};

export default ReviewForm;
