const { useState, useEffect } = React

import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

import { bookService } from "../services/book.service.js"


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
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

    // function onRemoveCar(carId) {
    //     carService.remove(carId)
    //         .then(() => {
    //             setCars((prevCars) => prevCars.filter(car => car.id !== carId))
    //             flashMsg(`Car removed successfully (${carId})`)
    //         })
    //         .catch((err) => {
    //             console.log('Had issues removing car', err)
    //             flashMsg(`Could not remove car (${carId})`)
    //         })
    // }

    // function onUpdateCar(carToUpdate) {
    //     carService.save(carToUpdate)
    //         .then((savedCar) => {
    //             setCars(prevCars => prevCars.map(car => car.id === savedCar.id ? savedCar : car))
    //             flashMsg(`Car updated successfully (${carToUpdate.id})`)
    //         })
    //         .catch(err => {
    //             console.log('Had issues with updating car', err)
    //             flashMsg(`Could not update car (${carToUpdate.id})`)
    //         })
    // }

    function onSelectBook(book) {
        console.log('selected book', book)
        setSelectedBook(book)
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
            !selectedBook && <React.Fragment>
                <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
                <h1>Our Books</h1>
                <BookList
                    books={books}
                    // onRemoveCar={onRemoveCar}
                    // onUpdateCar={onUpdateCar}
                    onSelectBook={onSelectBook}
                />
            </React.Fragment>
        }

        {
            selectedBook && <BookDetails
                book={selectedBook}
                onGoBack={() => onSelectBook(null)}
            />
        }

     {/* <UserMsg msg={userMsg} /> */}


    </section >
}
