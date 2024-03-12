const { useState, useEffect } = React
const { useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { ReviewsPreview } from "./ReviewsPreview.jsx"


export function Reviews() {
    const [bookReviews, setReviews] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.get(bookId)
            .then((book) => {
                setReviews([...book.reviews])
            })
            .catch(err => {
                console.log(`canot faind reviews`, err);
            })
    }


    if (!bookReviews) return <div>Loding...</div>
    return <section className="main-reviews-container">
        <h1>Reviews</h1>
        <main className="reviews-container">
            {
                <ul className="reviews-list clean-list">
                    {
                        bookReviews.map((review, idx) => <li key={idx}>
                            <ReviewsPreview review={review} />
                            {/* <div className="book-actions">
                                <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>X</button>
                                <Link to={`/book/edit/${book.id}`}><button>Edit book</button></Link>
                            </div> */}
                        </li>)
                    }
                </ul>
            }
        </main>
    </section>
}