const copyButton = document.querySelector('button.copy')

copyButton.addEventListener('click', () => {
  const texts = document.querySelectorAll('.transcription .content p')

  const output = Array.from(texts).map((text) => text.innerText).join('\n')

  navigator.clipboard.writeText(output)

  const icon = copyButton.querySelector('i.ph')

  icon.classList.remove('ph-copy-simple')
  icon.classList.add('ph-check-circle')

  setTimeout(() => {
    icon.classList.remove('ph-check-circle')
    icon.classList.add('ph-copy-simple')
  }, 2000)
})