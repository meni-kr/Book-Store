

export function BookPreview({ book, idx }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <h5>Price : {book.listPrice.amount} :{book.listPrice.currencyCode}</h5>
        <img src={`/assets/img/${idx + 1}.jpg`} alt={book.title} />
    </article>
}