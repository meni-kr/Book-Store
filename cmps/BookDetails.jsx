import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({ book, onGoBack }) {
	// Render time methods


	function getReadingType() {
		if (book.pageCount > 500) return 'Serious Reading!'
		else if (book.pageCount > 200) return 'Descent Reading'
		else return 'Light Reading'
	}

	function getPublishedDate() {
		const thisYear = new Date().getFullYear()
		const diff = thisYear - book.publishedDate
		if (diff >= 10) return ' Vintage'
		if (diff <= 1) return 'New'
		return book.publishedDate
	}

	function getPriceClass() {
		if (book.listPrice.amount > 150) return ' red'
		else if (book.listPrice.amount < 20) return ' green'
		else return ''
	}

	return <section className="book-details">
		<h3>{book.listPrice.isOnSale && <img className="on-sale" src='/assets/img/Sale1.png' />}</h3>
		<header className="book-details-header">
			<button className="btn-go-back" onClick={onGoBack}>Go back</button>
			<h1>Title : {book.title}</h1>
			<p>author: {book.authors.join(', ')}</p>
			<h2>subtitle : {book.subtitle}</h2>
		</header>
		<main className="book-details-main">
			<img src={book.thumbnail} alt={book.title} />
			<aside className="book-details-aside">
				<p>book language: {book.language}</p>
				<p>{getPublishedDate()}</p>
				<p>{getReadingType()}</p>
				<p>categories: {book.categories.join(', ')}</p>
				<LongTxt txt={book.description} />
				<p className={getPriceClass()}>Price:{book.listPrice.amount} : {book.listPrice.currencyCode}</p>
			</aside>
		</main>


	</section>
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
