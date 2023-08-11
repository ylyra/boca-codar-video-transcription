import fs from 'fs';
import ytdl from 'ytdl-core';

export const downloader = (videoId) => {
  return new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    console.log('[START_DOWNLOAD]', videoUrl);

    ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'lowestaudio',
    })
    .on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      console.log('[DOWNLOAD_PROGRESS]', videoUrl, percent);
    })
    .on('end', () => {
      console.log('[END_DOWNLOAD]', videoUrl);
      resolve();
    })
    .on('error', (err) => {
      console.log('[ERROR_DOWNLOAD]', videoUrl, err);
      reject(
        '[ERROR_DOWNLOAD] - Não foi possível baixar o vídeo'
      );
    })
    
    .pipe(fs.createWriteStream(`audio.mp4`));
  });
}