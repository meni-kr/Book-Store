export function ReviewsPreview({review}){

    return <section className="card-review">
        <span>name: {review.fullName}</span>
        <span>rating: {review.rating}</span>
        <span>readAt: {review.readAt}</span>
    </section>
}