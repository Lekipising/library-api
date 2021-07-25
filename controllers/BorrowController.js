import Borrows from "../models/borrows.js";
import Books from "../models/books.js";


//Add a book borrowing
export async function addBorrowing(req, res) {
    try {
        let borrowBook = await Books.findAll({ where: { bookid: req.body.titleid } });
        let copies = borrowBook[0].copies
        let updatedCopies = copies - 1
        let updatedBook = await Books.update(borrowBook,  {where: { copies: updatedCopies }});

        let todayDate = new Date()
        let toReturnDate = new Date()
        toReturnDate.setDate(todayDate.getDate() + 5);

        let newBorrow = {
            titleid: req.body.titleid,
            memberid: req.body.memberid,
            returndate: toReturnDate,
            returned: false
        }
        let borrowing = await Borrows.create(newBorrow);

        if (borrowing && updatedBook) {
            res.status(200).json({
                success: true,
                message: 'Borrow created successfully',
                data: borrowing
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Borrow could not be created at this time'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a borrowing
export async function viewBorrowing(req, res) {
    try {
        let allborrowings = await Borrows.findAll({where: {borrowid: req.params.id}});
        if (allborrowings) {
            res.json({
                success: true,
                message: 'Borrow records retrieved successfully',
                data: allborrowings
            })
        } else {
            res.json({
                success: true,
                message: 'No Borrow records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View all borrowings
export async function viewAllBorrowings(req, res) {
    try {
        let allborrowings = await Borrows.findAll();
        if (allborrowings) {
            res.json({
                success: true,
                message: 'Borrow records retrieved successfully',
                data: allborrowings
            })
        } else {
            res.json({
                success: true,
                message: 'No Borrow records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Update borrowing record
export async function returnBook(req, res) {
    try {
        let BorrowRecord = await Borrows.findAll({where: {borrowid: req.params.id}});
        let returnedBook = await Books.findAll({ where: { bookid: BorrowRecord[0].titleid } });

        let copies = returnedBook[0].copies
        let updatedCopies = copies + 1

        let newBook = {
            copies : updatedCopies
        }

        let newBorrow = {
            returned : true
        }

        let updatedBook = await Books.update(newBook, {where : {bookid : BorrowRecord[0].titleid}});
        let updatedBorrow = await Borrows.update(newBorrow, {where : {borrowid : req.params.id}});

        if (updatedBorrow && updatedBook) {
            res.json({
                success: true,
                message: 'Borrows record updated successfully',
                data: updatedBorrow
            })
        } else {
            res.json({
                success: true,
                message: 'No borrowing records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}