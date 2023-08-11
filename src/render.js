window.seek = (event) => {
  const seekTo = event.currentTarget.dataset.seekTo

  window.YTPlayer.seekTo(seekTo, true)  
  window.YTPlayer.playVideo()
}

const getMinutes = (timestamp) => {
  let date = new Date(null)
  date.setMilliseconds(timestamp[0] * 1000)
  return date.toISOString().slice(11, 19)
}

const groupedText = ({
  timestamp,
  text
}) => {
  const words = text.split(' ')

  const groups = [];
  
  for (let idx = 0; idx < words.length; idx++) {
    if (idx % 3 === 0) {
      groups.push(
        words.slice(idx, idx + 3).join(' ')
      )
    }
  }

  return groups.map((group, idx) => {
    const [initialTime, finalTime] = timestamp;

    const seekTo = idx === 0 ? initialTime : 
      ((finalTime - initialTime) / (groups.length - idx)) + initialTime

    

    return `<span onclick='seek(event)' data-seek-to='${seekTo}'>${group.trim()} </span>`
  }).join(' ')
}

const renderChunk = ({
  timestamp,
  text
}) => `<div class="chunk">
<time>${getMinutes(timestamp)}</time>
<p>
  ${groupedText({
    timestamp,
    text
  })}
</p>
</div>`

export function renderText({chunks}) {
  const formattedTranscription = chunks.map(renderChunk).join('')

  document.querySelector('.transcription .content').innerHTML = formattedTranscription
}