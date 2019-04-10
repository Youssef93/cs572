const student = {
    name: String,
    phone: Number
}

const book = {
    ISBN: String,
    author: String,
    tags: [String],
    borrow: {
        name: String,
        phone: Number,
        returnDate: Date
    }
}

// we creat index on borrow.returnDate as the query that is used most is 'books that should have been returned but not'
// since the return date is in the borrow object, then if no one is borrowing it it will not be indexed.