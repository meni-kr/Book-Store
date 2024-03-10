

export function BookPreview({ book, idx }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <h4>{book.subtitle}</h4>
        <h3>{(book.listPrice.isOnSale)? 'on Sale' : 'Not on Sale'}</h3>
        <img src={book.thumbnail} alt={book.title} />
        <h5>Price : {book.listPrice.amount} :{book.listPrice.currencyCode}</h5>
    </article>
}


// {
//     "id": "OXeMG8wNskc",
//     "title": "metus hendrerit",
//     "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
//     "authors": [
//       "Barbara Cartland"
//     ],
//     "publishedDate": 1999,
//     "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
//     "pageCount": 713,
//     "categories": [
//       "Computers",
//       "Hack"
//     ],
//     "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
//     "language": "en",
//     "listPrice": {
//       "amount": 109,
//       "currencyCode": "EUR",
//       "isOnSale": false
//     }
//   }