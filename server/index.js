import cors from "cors";
import express from "express";
import { createMP3 } from "./create-mp3.js";
import { downloader } from "./download-video.js";

const app = express();

app.use(cors());

app.get('/audio', async (req, res) => {
  const videoId = req.query.v;

  try {
    // download audio
    await downloader(videoId);
    // convert audio.mp4 to audio.mp3
    await createMP3();
        
    return res.json({ audio: `https://www.youtube.com/watch?v=${videoId}` });
  } catch (error) {
    console.log('[SERVER_ERROR]', error);
    return res.status(500).json({ error: 'Server error' });
  }
})

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});