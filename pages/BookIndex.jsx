const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"


export function BookIndex() {
    const [books, setBooks] = useState(null)
    // const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    // const [selectedCar, setSelectedCar] = useState(null)
    // const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [])

    // function onSetFilter(fieldsToUpdate) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    // }

    function loadBooks() {
        bookService.query()
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

    // function onSelectCar(car) {
    //     console.log('selected car', car)
    //     setSelectedCar(car)
    // }

    // function flashMsg(txt) {
    //     setUserMsg(txt)
    //     setTimeout(() => {
    //         setUserMsg('')
    //     }, 3000)
    // }

    // console.log('cars from car index', cars)
    // console.log('selectedCar from car index', selectedCar)
    if (!books) return <div>loading...</div>
    return <section className="book-index">
        <h1>Our Books</h1>
        <BookList
            books={books}
            // onRemoveCar={onRemoveCar}
            // onUpdateCar={onUpdateCar}
            // onSelectCar={onSelectCar}
        />

    </section >
}


// !selectedCar && <React.Fragment>
//                 <CarFilter
//                     onSetFilter={onSetFilter}
//                     filterBy={filterBy} />
//                 <h1>Our cars</h1>
//                 <CarList
//                     cars={cars}
//                     onRemoveCar={onRemoveCar}
//                     onUpdateCar={onUpdateCar}
//                     onSelectCar={onSelectCar}
//                 />
//             </React.Fragment>
//         }

//         {
//             selectedCar && <CarDetails
//                 car={selectedCar}
//                 onGoBack={() => onSelectCar(null)}
//             />
//         }

//         <UserMsg msg={userMsg} />