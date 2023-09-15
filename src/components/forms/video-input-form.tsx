import { useMemo, useRef, useState } from 'react'
import { FileVideo, Upload } from 'lucide-react'
import { api } from '@/lib/axios'
import { convertVideoToAudio } from '@/lib/ffmpeg'
import { Separator, Label, Textarea, Button } from '@/components'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages: { [key in Status]: string } = {
  waiting: 'Carregar vídeo',
  converting: 'Convertendo...',
  uploading: 'Carregando...',
  generating: 'Transcrevendo...',
  success: 'Sucesso!',
}

type Props = {
  onVideoUploaded: (id: string) => void
}

export function VideoInputForm({ onVideoUploaded }: Props) {
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [status, setStatus] = useState<Status>('waiting')

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function handleUploadVideo(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      if (!videoFile) throw new Error('Missing video file')

      setStatus('converting')
      const prompt = promptInputRef.current?.value || ''
      const audioFile = await convertVideoToAudio(
        videoFile,
        setConversionProgress,
      )

      const data = new FormData()
      data.append('file', audioFile)

      setStatus('uploading')
      const response = await api.post('/videos', data)
      const videoId = response.data.video.id

      setStatus('generating')
      await api.post(`/videos/${videoId}/transcription`, { prompt })

      setStatus('success')
      onVideoUploaded(videoId)
    } catch (error) {
      setStatus('waiting')
      console.error(error)
    }
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) return ''
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className="space-y-5">
      <label
        htmlFor="video"
        className="relative flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed text-sm text-muted-foreground aspect-video cursor-pointer hover:bg-primary/10 transition-colors"
      >
        {videoFile ? (
          <video
            src={previewUrl}
            controls={false}
            className="pointer-events-none absolute m-auto inset-0 max-h-full max-w-full"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Carregar vídeo
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          id="transcription_prompt"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          className="h-20 leading-relaxed"
          disabled={status !== 'waiting'}
          ref={promptInputRef}
        />
      </div>

      <Button
        type="submit"
        disabled={status !== 'waiting'}
        data-success={status === 'success'}
        className="w-full transition-colors data-[success=true]:bg-emerald-700 data-[success=true]:opacity-100"
      >
        {statusMessages[status]}
        {status === 'waiting' ? (
          <Upload className="w-4 h-4 ml-2" />
        ) : status === 'converting' ? (
          <>{conversionProgress}%</>
        ) : (
          ''
        )}
      </Button>
    </form>
  )
}
