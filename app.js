const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Testing... Status: OK.');
})

app.listen(PORT, () => {
    console.log(`Server started. Listening at port ${PORT}.`);
})