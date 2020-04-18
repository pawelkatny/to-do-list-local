const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const currentDate = require(__dirname + '/modules/date.js');
const fileSystem = require(__dirname + '/modules/fileSystem.js');
const lists = fileSystem.loadLists();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {lists:lists});
})

app.post('/newlist', (req, res) => {
    if (req.body.title === '') {
        req.body.title = currentDate.getDate();
    }
    const newList = {
        title: req.body.title,
        items: [
            { id: 0, value: 'item1', isDone: false },
        ]
    }

    lists.push(newList);
    res.redirect('/');
})


app.listen(PORT, () => {
    console.log(`Server started. Listening at port ${PORT}.`);
})