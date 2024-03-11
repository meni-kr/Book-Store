import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import { demoBooks } from '../booksDemo.js'


const BOOK_KEY = 'bookDB'
var gFilterBy 
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        book = _createBook(book.title, book.listPrice.amount)
        return storageService.post(BOOK_KEY, book)
    }
}


function getEmptyBook(title = '', amount = 0) {
    // return { id: '', title, listPrice }
    return {
        id:'',
        title,
        subtitle: '',
        authors: [],
        publishedDate: utilService.getRandomIntInclusive(1990,2003),
        description: utilService.makeLorem(50),
        pageCount: utilService.getRandomIntInclusive(80,300),
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: { 
            amount,
            currencyCode: '',
             isOnSale: false
        }
    }
}



function getDefaultFilter() {
    return { txt: '', minPrice: 0, desc: '' }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksDemo.demoBooks
        // books.push(_createBook('The wheel of Time', 300))
        // books.push(_createBook('The name of the Wind', 120))
        // books.push(_createBook('Without A Word', 100))
        // books.push(_createBook('The Death Gate Cycle', 150))
        console.log('books:', books)
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}

// function _createListPrice(amount = 109,currencyCode = 'EUR',isOnSale = false){
//     return {
//         amount,
//     currencyCode,
//     isOnSale
//     }
    
// }

