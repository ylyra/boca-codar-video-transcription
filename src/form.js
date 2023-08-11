import axios from 'axios';
import { loadingMessage, startLoading, stopLoading } from "./loading";
import { renderText } from "./render";
import { transcribeAudio } from './transcribe';
import { getYoutubeVideoId, loadVideo } from "./youtube-api";

const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    startLoading();
    loadingMessage('Iniciando a aplicação')

    const formData = new FormData(form)
    const url = formData.get('url');

    const videoId = getYoutubeVideoId(url);
    await loadVideo(videoId);

    loadingMessage('Baixando e convertendo o áudio');
    await axios.get('http://localhost:3333/audio', {
      params: {
        v: videoId,
      }
    })

    const data = await transcribeAudio();

    renderText(data);
  } catch (error) {
    console.log('[SUBMIT_ERROR]', error); 
    throw new Error(error);  
  } finally {
    stopLoading();
  }
});
