const express = require('express');
const app = express();
const books = require('./routes/books');
const path = require('path');

const db = require('./models');
const { Book } = db.models;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', books);

app.use((req, res, next) => {
     res.render('page_not_found');
});

app.listen(3000, () => {
    console.log("Listening on localhost 3000");
});

/*(async () => {
    await db.sequelize.sync({force: true});
    try {
        const book = await Book.create({
            title: 'A Brief History of Time',
            author: 'Stephen Hawking',
            genre: 'Non Fiction',
            year: 1988
        });
        
        console.log(book.toJSON());
       
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }

})();*/

module.exports = app;


