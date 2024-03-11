const { useParams } = ReactRouter

import { bookService } from "../services/book.service.js"

export function AddReview() {
    const { bookId } = useParams()

    function onAddReview(ev) {
        ev.preventDefault()

        bookService.addReview(bookId,{
            fullName: ev.target.elements.fullName.value,
            rating: ev.target[1].value,
            readAt: ev.target.elements.readAt.value
        })


    }
    return <section className="add-review">
        <form id="frmReview" onSubmit={onAddReview}>

            <label htmlFor="fullName">Name:</label>
            <input type="text" id="fullName" required name="fullName" placeholder="First and last name" />
            <select className="rating" >
                <option value={"1"} >⭐</option>
                <option value={"2"} >⭐⭐</option>
                <option value={"3"} >⭐⭐⭐</option>
                <option value={"4"} >⭐⭐⭐⭐</option>
                <option value={"5"} >⭐⭐⭐⭐⭐</option>
            </select>
            <label htmlFor="readAt">Read At:</label>
        <input type="date" id="readAt" name="readAt" />
        <button className="btn-add-review">Add</button>
        </form>
    </section>
}
