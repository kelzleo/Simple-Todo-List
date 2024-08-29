const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const Todo = require('./mongodb')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.post('/', (req, res) => {
    const todo = new Todo({
        todo: req.body.todoValue
    })

    todo.save()
    .then(result => {
        res.redirect("/")
    })
    
})


app.get('/', (req, res) => {
    Todo.find()
    .then(result => {
        res.render('index', {title: 'Home', data: result})
        console.log(result)
    })
})

app.get('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});


app.listen(5500, () => {
    console.log("server running on port 5500")
})

