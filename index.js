const express = require('express');
const morgan = require('morgan');
const path = require('path');

const crypto = require('crypto');

const yt2mp3 = require('./scripts/yt2mp3');

const app = express();
const port = 3000;

app.use('/public', express.static(__dirname + '/public'));
app.use('/output', express.static(__dirname + '/output'));

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/yt2mp3', (req, res) => {
  const url = req.query.url;
  const id = crypto.createHash('md5').update(url).digest("hex");
  yt2mp3(url, id).then((data) => {
    res.send(`/output/${id}.mp3`);
    console.log('finished');
  });
});

app.listen(port, () => console.log(`Multitool listening on port ${port}!`))