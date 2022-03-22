const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// routes
app.post('/route1', (req, res) => {
    const params = req.body;
    console.log('params ', params )
    console.log('params ', Object.keys(params) )
    let classification = params.webdriver ? 'Bot' : 'Human';
    console.log(`route 1 navigated to. ${classification} detected.`);
    res.json({classification})
})

app.post('/route2', (req, res) => {
    const params = req.body;
    console.log('params ', params )
    console.log('params ', Object.keys(params) )
    // let classification = params.webdriver ? 'Bot' : 'Human';
    // console.log(`route 1 navigated to. ${classification} detected.`);
    res.json('ok')
})

app.get('/route1', (req, res) => {
    // console.log('route 1 navigated to');

    // let classification = 'Human';
    res.end('test');
})

app.listen(3000, () => console.log('Example app is listening on port 3000'))