export function ReviewPreview(props) {
    const { review, onRemoveReview } = props
    return (
        <section className="review" key={review.id}>
            <button className="delete-review pointer" onClick={() => { onRemoveReview(review.id) }}>&times;</button>
            fullName: {review.fullName}<br />
            {review.stars &&
                <div className="ratings">
                    {
                        [1, 2, 3, 4, 5].map((num) => <span key={num} className={`fa fa-star ${(review.stars >= num) ? 'checked' : ''}`}> </span>)
                    }
                </div>
            }
            Read Date: {review.readDate}<br />
            Review: {review.textarea}
        </section>
    )
}

