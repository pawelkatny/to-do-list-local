const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const appData = require(__dirname + '/modules/appData.js');
const fileSystem = require(__dirname + '/modules/fileSystem.js');
const lists = fileSystem.loadLists();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { lists: lists });
})

app.post('/newlist', (req, res) => {
    if (req.body.title === '') {
        req.body.title = appData.getDate();
    }

    let listID = appData.getID(lists);
    let newList = appData.newList(req.body, listID)
    lists.push(newList);

    res.redirect('/');
    fileSystem.saveList(listID, newList);
})

app.post('/additem', (req, res) => {
    console.log(req.body.newItem);

    const index = lists.findIndex(ele => ele.ID === Number(req.body.listID));
    
    let itemID = appData.getID(lists[index].items);
    let newItem = appData.newItem(req.body, itemID);
    lists[index].items.push(newItem);

    res.redirect('/');

    fileSystem.updateFile(lists[index]);
})

app.post('/deletelist', (req, res) => {
    let listID = req.body.listID;
    let index = appData.findID(lists, listID);
    
    lists.splice(index, 1); 
    
    res.send({redirect_path: '/'});
})

app.listen(PORT, () => {
    console.log(`Server started. Listening at port ${PORT}.`);
})