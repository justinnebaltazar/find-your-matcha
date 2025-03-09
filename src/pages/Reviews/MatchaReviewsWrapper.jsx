import { useParams } from "react-router-dom";
import MatchaReviews from "./Reviews";

function MatchaReviewsWrapper() {
  const { placeId } = useParams();
  return <MatchaReviews placeId={placeId} />;
}

export default MatchaReviewsWrapper;