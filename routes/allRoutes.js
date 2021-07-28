import express from "express";
import { addBook, viewBook, viewAllBooks, deleteBook, updateBook } from '../controllers/BooksController.js';
import { addBorrowing, viewBorrowing, viewAllBorrowings, returnBook, viewMemberBorrowings } from '../controllers/BorrowController.js';
import { addMember, signinMember, viewMember, viewAllMembers, updateMember, deleteMember } from '../controllers/MemberController.js';

const booksRouter = express.Router();
const membersRouter = express.Router();
const borrowsRouter = express.Router();
const adminsRouter = express.Router();

// books
// add book
booksRouter.post("/", addBook)
// view one book
booksRouter.get("/:id", viewBook)
// view all books
booksRouter.get("/", viewAllBooks)
// delete book
booksRouter.delete("/:id", deleteBook)
// update book
booksRouter.put("/:id", updateBook)

// borrows
// create borrow
borrowsRouter.post("/", addBorrowing)
// return borrow
borrowsRouter.post("/:id", returnBook)
// view one borrow
borrowsRouter.get("/:id", viewBorrowing)
// view all borrows
borrowsRouter.get("/", viewAllBorrowings)
// view all borrows of a member
borrowsRouter.get("/member/:id", viewMemberBorrowings)

// members
// signup
membersRouter.post("/signup", addMember)
// signin
membersRouter.post("/signin", signinMember)
// view one
membersRouter.get("/:id", viewMember)
// view all
membersRouter.get("/", viewAllMembers)
// update member
membersRouter.put("/:id", updateMember)
// delete member
membersRouter.delete("/:id", deleteMember)

const router = express.Router();

router.use("/book", booksRouter)
router.use("/borrow", borrowsRouter)
router.use("/admin", adminsRouter)
router.use("/members", membersRouter)

export default router;