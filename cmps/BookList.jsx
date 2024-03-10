

import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, onRemoveCar, onUpdateCar, onSelectBook }) {

	// function onChangeSpeed(car) {
	// 	car = { ...car, maxSpeed: car.maxSpeed + 10 }
	// 	onUpdateCar(car)
	// }

	if (!books.length) return <div>No books to show</div>
	return <ul className="book-list">
		{
			books.map((book,idx) => <li key={book.id}>
				<BookPreview 
                book={book}
                idx={idx} />
				<div className="book-actions">
					<button className="remove-btn" onClick={() => onRemoveBook(book.id)}>X</button>
					<button onClick={() => { onChangePrice(book) }}>Change Price</button>
					<button onClick={() => { onSelectBook(book) }}>Select book</button>
				</div>
			</li>)
		}
	</ul>
}