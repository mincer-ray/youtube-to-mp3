const express = require('express');
const morgan = require('morgan');
const path = require('path');

const fs = require('fs');

const crypto = require('crypto');

const yt2mp3 = require('./scripts/yt2mp3');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));

app.use('/public', express.static(__dirname + '/public'));
app.use('/output', express.static(__dirname + '/output'));

fs.stat(`${__dirname}/output/manifest.json`, (err, stat) => {
  if (err) {
    fs.writeFile(`${__dirname}/output/manifest.json`, '{}', (err) => {
      if (err) throw err;
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/yt2mp3', (req, res) => {
  const url = req.query.url;
  const id = crypto.createHash('md5').update(url).digest("hex");
  yt2mp3(url, id).then((data) => {
    console.log('finished');
  });
  
  res.send(id);
});

app.get('/status', (req, res) => {
  const id = req.query.id;

  if (fs.existsSync(__dirname + '/output/' + id + '_finished.mp3')) {
    res.send('ready');
  } else {
    const manifest = require('./output/manifest.json');
    const progress = manifest[id].progress;
    res.send(progress);
  }
});

app.listen(port, () => console.log(`Multitool listening on port ${port}!`))