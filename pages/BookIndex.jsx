const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

import { bookService } from "../services/book.service.js"


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    // const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBook) => prevBook.filter(book => book.id !== bookId))
                flashMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('Had issues removing book', err)
                flashMsg(`Could not remove book (${bookId})`)
            })
    }

    function onUpdateBook(bookToUpdate) {
        bookService.save(bookToUpdate)
            .then((savedBook) => {
                setBooks(prevBooks => prevBooks.map(book => book.id === savedBook.id ? savedBook : book))
                // flashMsg(`Car updated successfully (${bookToUpdate.id})`)
            })
            .catch(err => {
                console.log('Had issues with updating car', err)
                // flashMsg(`Could not update car (${bookToUpdate.id})`)
            })
    }

    

    // function flashMsg(txt) {
    //     setUserMsg(txt)
    //     setTimeout(() => {
    //         setUserMsg('')
    //     }, 3000)
    // }

    if (!books) return <div>loading...</div>
    return <section className="book-index">
        {
            <React.Fragment>
                <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
                <h1>Our Books</h1>
                <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onUpdateBook={onUpdateBook}
                    // onSelectBook={onSelectBook}
                />
            </React.Fragment>
        }
<Link to="/book/edit"><button>Add a book</button></Link>
        
     {/* <UserMsg msg={userMsg} /> */}


    </section >
}


// return <section className="car-index">
// <CarFilter
//     onSetFilter={onSetFilter}
//     filterBy={filterBy} />

// <Link to="/car/edit"><button>Add a car</button></Link>
// <CarList
//     cars={cars}
//     onRemoveCar={onRemoveCar}
//     onUpdateCar={onUpdateCar}
// />

// </section >