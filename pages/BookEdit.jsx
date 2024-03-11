const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => {
                console.log('Had issues loading book', err)
                navigate('/book')
            })
    }


    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                navigate('/book')
                // showSuccessMsg('Book saved successfully')
                console.log('savedBook', savedBook)
            })
            .catch(err => {
                console.log('Had issues saving book', err)
                // showErrorMsg('could not save book')
            })

    }

    function handleChange({ target }) {

        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
                value = +value || ''
                break
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }


        if (field === 'price') {
            setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }))
        } else {
            setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
        }

    }

    const { title, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"

                    name="title"
                    onChange={handleChange}
                    value={title}
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter price"

                    name="price"
                    onChange={handleChange}
                    value={listPrice.amount}
                />

                <button>Save</button>
            </form>
        </section>
    )
}