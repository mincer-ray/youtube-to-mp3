const fs = require('fs');
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const toMp3 = (url, name) => {
  let start = Date.now();

  let stream = ytdl(url, {
    quality: 'highestaudio',
  });
  
  return new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`${__dirname}/../output/${name}.mp3`)
      .on('progress', (p) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on('end', () => {
        fs.rename(`${__dirname}/../output/${name}.mp3`, `${__dirname}/../output/${name}_finished.mp3`)
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)
        resolve();
      });
  });
}

module.exports = toMp3;