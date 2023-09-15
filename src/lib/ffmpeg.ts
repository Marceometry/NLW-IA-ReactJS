import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import coreURL from '../ffmpeg/ffmpeg-core.js?url'
import wasmURL from '../ffmpeg/ffmpeg-core.wasm?url'
import workerURL from '../ffmpeg/ffmpeg-worker.js?url'

let ffmpeg: FFmpeg | null

export async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg

  ffmpeg = new FFmpeg()

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL,
    })
  }

  return ffmpeg
}

export async function convertVideoToAudio(video: File) {
  console.log('Convert started.')

  const input = 'input.mp4'
  const output = 'output.mp3'

  const ffmpeg = await loadFFmpeg()

  await ffmpeg.writeFile(input, await fetchFile(video))

  ffmpeg.on('log', console.error)
  ffmpeg.on('progress', (value) => {
    const progress = Math.round(value.progress * 100)
    console.log('Convert progress: ' + progress + '%')
  })

  await ffmpeg.exec([
    '-i',
    input,
    '-map',
    '0:a',
    '-b:a',
    '20k',
    '-acodec',
    'libmp3lame',
    output,
  ])

  const data = await ffmpeg.readFile(output)

  const config = { type: 'audio/mpeg' }
  const audioFileBlob = new Blob([data], config)
  const audioFile = new File([audioFileBlob], 'audio.mp3', config)

  return audioFile
}
