import { loadingMessage } from "./loading";

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

export function getYoutubeVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
  const match = regex.exec(url);

  if (!match) {
    throw new Error('URL inválida');
  }

  return match[1];
}

export function loadVideo(videoId) {
  loadingMessage('Carregando vídeo do Youtube');
  
  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player('youtubeVideo', {
      videoId: videoId,
      events: {
        onReady: () => resolve(),
        onError: (e) => reject(e),
      }
    });
  });
}