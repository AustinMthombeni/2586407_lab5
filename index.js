import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const router = express.Router();

let books = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    details: [
      {
        id: "1",
        author: "Harper Lee",
        genre: "Fiction",
        publicationYear: 1960
      }
    ]
  }
];

router.get('/', (req, res) => {
  res.json(books);
});


router.get('/:id',function(req,res){
    const { id } = req.params;
    const findBook = books.find(function(book){
            return book.id === id;
        
    })
    if(findBook){
       
        res.json(findBook);
    }
    else{
        res.status(404).json('404 Not found');
    }
    
});


router.post('/', (req, res) => {
  const { id, title, details } = req.body;
  if (!id || !title || !details || !Array.isArray(details)) {
    return res.status(400).json({ error: 'Missing required book details' });
  }

  const newBook = { id, title, details };
  books.push(newBook);

  res.json({ message: "Book added successfully" });
});

router.put('/:id',function(req,res){
    const { id } = req.params;
    const { title,details } = req.body;
    const book = books.find(function(book){
        return book.id = id;
    })
    if(title){
        book.title = title;
    }
    if(details){
        book.details = details;
    }

    res.json({"message":"succefully updated book information"});
    

})

router.delete('/:id',function(req,res){
    const { id } = req.params;
    books = books.filter(function(books){
        return books.id !== id;
    })
    res.json({"message": "Book deleted"});

})

router.post('/:id/details',function(req,res){
    const { id } = req.params;
    const newDetail= req.body;
    const book = books.find(function(book){
        return book.id === id;
    })
      
    if(newDetail){
        Object.assign(book.details[0], newDetail);
        res.json({"message": "Book details updated"});
    }
    else{
        res.status(400).json({"error": "Enter at least one field"});
    }

})


router.delete('/books/:id/details/:detailId', function(req, res) {
    const { id, detailId } = req.params;
    const key = req.body;
    
    const book = books.find(function(book) {
        return book.id === id;
    });

    const detail = book.details.find(function(detail) {
        return detail.id === detailId;
    });

    delete detail[key];

    res.json("book deleted");
});



app.use('/books', router);


app.get('/', function(req, res)  {

  res.send("Hello from home page");
});


app.listen(PORT, function() {
    console.log(`Server started at port ${PORT}`);
});
  