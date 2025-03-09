import React, { useState } from 'react';
import styles from "./Rating.module.css";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "\u2605";  
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "#5B744B";

export default function Rating({ count = DEFAULT_COUNT, defaultRating = 0, icon = DEFAULT_ICON, color = DEFAULT_COLOR, iconSize = 14 }) {
    const [rating, setRating] = useState(defaultRating);
    const [temporaryRating, setTemporaryRating] = useState(0);

    const handleClick = (newRating) => {
        setRating(newRating);
        localStorage.setItem("rating", newRating);
    };

    return (
        <div className={styles.container}>
            {[...Array(count)].map((_, index) => {
                const isActiveColor = index < rating || index < temporaryRating;
                return (
                    <span
                        key={index}
                        className={styles.rating}
                        style={{
                            fontSize: `${iconSize}px`,
                            color: isActiveColor ? color : DEFAULT_UNSELECTED_COLOR,
                            cursor: "pointer",
                        }}
                        onMouseEnter={() => setTemporaryRating(index + 1)}
                        onMouseLeave={() => setTemporaryRating(0)}
                        onClick={() => handleClick(index + 1)}
                    >
                        {icon}
                    </span>
                );
            })}
        </div>
    );
}

