import { useMemo, useRef, useState } from 'react'
import { FileVideo, Upload } from 'lucide-react'
import { convertVideoToAudio } from '@/lib/ffmpeg'
import { Separator, Label, Textarea, Button } from '@/components'

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null)

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function handleUploadVideo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!videoFile) return

    const prompt = promptInputRef.current?.value || ''
    const audioFile = await convertVideoToAudio(videoFile)
    console.log(prompt, audioFile)
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) return ''
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
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
          ref={promptInputRef}
        />
      </div>

      <Button type="submit" className="w-full transition-colors">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
