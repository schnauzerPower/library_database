const express = require('express');
const router = express.Router();

const db = require('../models');
const { Book } = db.models;

//Handle 500 erros
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
        console.error(error);
        res.render('server_error', {error});
    }
  }
}

//Home route
router.get('/', asyncHandler(async(req, res) => {
  res.redirect('/books/8');
}));

router.get('/books', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render("books/index", {books});
}));

//Create new book
router.get('/books/new', asyncHandler(async(req, res) => {
    res.render('books/new-book', {book: {}});
}))

router.post('/books/new', asyncHandler(async(req, res) => {
    let book;
    try {
       book = await Book.create(req.body);
       res.redirect('/books/');
    }catch(error) {
        if(error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("books/new-book", {book, errors: error.errors})
        }else {
            throw error;
        }
    }
}));


//View book info and update
router.get('/books/:id', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
       res.render("books/update-book", {book});
  }else {
       res.render("page_not_found")
  }
}));

router.post('/books/:id', asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        await book.update(req.body);
        res.redirect('/books/');
    }else {
       res.render("page_not_found")
    } 
}))

//Delete book
router.post('/books/:id/delete', asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        await book.destroy();
        res.redirect('/books');
    }else {
       res.render("page_not_found")
    }
}))



/* Create a new article form. 
router.get('/new', (req, res) => {
  res.render("articles/new", { article: {}, title: "New Article" });
});*/

/*router.post('/', asyncHandler(async (req, res) => {
  let article;
  try {
    article = await Article.create(req.body);
    res.redirect("/articles/" + article.id);  
  }
  catch(error) {
      if(error.name === "SequelizeValidationError") {
          article = await Article.build(req.body);
          res.render("articles/new", { article, errors: error.errors, title: "New Article" }); 
      }
      else {
          throw error;
      }
  }
  
}));*/







module.exports = router;







