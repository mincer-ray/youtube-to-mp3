const fs = require('fs');
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

let name = 'song'
let id = 'https://www.youtube.com/watch?v=tIdIqbv7SPo';

let stream = ytdl(id, {
  quality: 'highestaudio',
});

let start = Date.now();

ffmpeg(stream)
  .audioBitrate(320)
  .save(`${__dirname}/${name}.mp3`)
  .on('progress', (p) => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${p.targetSize}kb downloaded`);
  })
  .on('end', () => {
    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)});
  