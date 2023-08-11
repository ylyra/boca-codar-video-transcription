// import { pipeline } from '@xenova/transformers';
import { loadingMessage, stopLoading } from './loading';

// let data = null;
import data from './data.json';

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time();
    loadingMessage('Transcrevendo o áudio');
    console.log('[START_TRANSCRIBE]', options);

    // const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-large') //large-v2

    // data = await transcriber('../audio.mp3', options)
  } catch (error) {
    console.log('[TRANSCRIBE_ERROR]', error)
  } finally {
    stopLoading();
    console.timeEnd();
    console.log('[END_TRANSCRIBE]');
  }
  
  return data;
}