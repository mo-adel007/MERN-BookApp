import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

///////////////////////////////////////////////////////
// add a new book
///////////////////////////////////////////////////////
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please fill in all the needed fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
//////////////////////////////////////////////////
// get a book by id
/////////////////////////////////////////////////
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
/////////////////////////////////////////////////////
// get all books
////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
//////////////////////////////////////////////////
// update an existing book
/////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please fill in all the needed fields" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ result: result, message: "Book is updated succefully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
///////////////////////////////////
// delete a book
////////////////////////////////////

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
