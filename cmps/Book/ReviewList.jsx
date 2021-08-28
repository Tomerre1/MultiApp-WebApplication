import { ReviewPreview } from "./ReviewPreview.jsx"
export function ReviewList(props) {
    return (
        <div className="reviews-list">
            {props.reviews.map((review) => <ReviewPreview key={review.id} onRemoveReview={props.onRemoveReview} review={review} />)}
        </div>
    )
}

