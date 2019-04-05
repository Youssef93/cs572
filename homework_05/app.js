const express = require('express');
const axios = require('axios');

const app = express();

app.enable('trust proxy');
app.set('x-powered-by', false);
app.enable('case sensitive routing');
app.enable('strict routing');

app.get('/users', async (req, res) => {
    try {
        const result = await axios.get('https://randomuser.me/api/?results=10');
        res.setHeader('Last-Modified', new Date());
        res.setHeader('Cache-Control', 'private, max-age=86400');
        res.setHeader('If-Modified-Since', new Date());
        res.setHeader('Link', '<http://localhost:3000/users?p=1> rel="first"');
        res.send(result.data.results);
    } catch(err) {
        console.log(err);
        res.send('error occured');
    }
});

app.listen(3000);
