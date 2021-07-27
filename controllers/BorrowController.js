import Borrows from "../models/borrows.js";
import Books from "../models/books.js";
import Members from "../models/member.js";

//Add a book borrowing
export async function addBorrowing(req, res) {
  try {
    let theMember = await Members.findAll({
      where: { memberid: req.body.memberid },
    });
    if (theMember.length == 0) {
      return res.json({
        success: false,
        message: "Member not found!",
      });
    }
    let borrowBook = await Books.findAll({
      where: { bookid: req.body.titleid },
    });
    if (borrowBook.length == 0) {
      return res.json({
        success: false,
        message: "Book not found!",
      });
    }
    let copies = borrowBook[0].copies;
    let titleBook = borrowBook[0].title;
    let updatedCopies = copies - 1;
    let newBk = {
      copies: updatedCopies,
    };
    let updatedBook = await Books.update(newBk, {
      where: { bookid: req.body.titleid },
    });
    let todayDate = new Date();
    let toReturnDate = new Date();
    toReturnDate.setDate(todayDate.getDate() + 5);

    let newBorrow = {
      titleid: req.body.titleid,
      title: titleBook,
      memberid: req.body.memberid,
      returndate: toReturnDate,
    };
    let borrowing = await Borrows.create(newBorrow);

    if (borrowing && updatedBook) {
      res.status(200).json({
        success: true,
        message: "Borrow created successfully",
        data: borrowing,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Borrow could not be created at this time",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//View a borrowing
export async function viewBorrowing(req, res) {
  try {
    let allborrowings = await Borrows.findAll({
      where: { borrowid: req.params.id },
    });
    if (allborrowings) {
      res.json({
        success: true,
        message: "Borrow records retrieved successfully",
        data: allborrowings,
      });
    } else {
      res.json({
        success: true,
        message: "No Borrow records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//View all borrowings
export async function viewAllBorrowings(req, res) {
  try {
    let allborrowings = await Borrows.findAll();
    if (allborrowings) {
      res.json({
        success: true,
        message: "Borrow records retrieved successfully",
        data: allborrowings,
      });
    } else {
      res.json({
        success: true,
        message: "No Borrow records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//Return borrowing record
export async function returnBook(req, res) {
  try {
    let BorrowRecord = await Borrows.findAll({
      where: { borrowid: req.params.id },
    });
    let returnedBook = await Books.findAll({
      where: { bookid: BorrowRecord[0].titleid },
    });

    let copies = returnedBook[0].copies;
    let updatedCopies = copies + 1;

    let newBook = {
      copies: updatedCopies,
    };

    let updatedBook = await Books.update(newBook, {
      where: { bookid: BorrowRecord[0].titleid },
    });
    let deletedBook = await Borrows.destroy({
      where: { borrowid: req.params.id },
    });

    if (deletedBook && updatedBook) {
      res.json({
        success: true,
        message: "Borrows record updated successfully",
        data: deletedBook,
      });
    } else {
      res.json({
        success: true,
        message: "No borrowing records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

export async function viewMemberBorrowings(req, res) {
  try {
    console.log("ID -> ", req.params.memberid);
    let memberBorrowings = await Borrows.findAll({
      where: { memberid: req.params.memberid },
    });
    if (memberBorrowings.length > 0) {
      res.json({
        success: true,
        message: "Borrowing records retrieved successfully",
        data: memberBorrowings,
      });
    } else {
      res.json({
        success: false,
        message: "No Borrowing records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}
