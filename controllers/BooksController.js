import Books from "../models/books.js";

//Add a Book
export async function addBook(req, res) {
  try {
    let book = await Books.create(req.body);
    if (book) {
      res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book could not be created at this time",
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

//View a book
export async function viewBook(req, res) {
  try {
    let allbooks = await Books.findAll({ where: { bookid: req.params.id } });
    if (allbooks) {
      res.json({
        success: true,
        message: "Book records retrieved successfully",
        data: allbooks,
      });
    } else {
      res.json({
        success: true,
        message: "No Book records found.",
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

//View all books
export async function viewAllBooks(req, res) {
  try {
    let allbooks = await Books.findAll();
    if (allbooks) {
      res.json({
        success: true,
        message: "Book records retrieved successfully",
        data: allbooks,
      });
    } else {
      res.json({
        success: true,
        message: "No Book records found.",
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

//Delete a book
export async function deleteBook(req, res) {
  try {
    let bookToDelete = await Books.findAll({
      where: { bookid: req.params.id },
    });
    if (bookToDelete) {
      let deletedBook = await Books.destroy({ where: { bookid: req.params.id } });
      if (deletedBook) {
        res.json({
          success: true,
          message: "Book records deleted successfully",
        });
      } else {
        res.json({
          success: true,
          message: "No Book records found.",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}
