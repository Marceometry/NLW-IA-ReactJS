import {
  Header,
  Main,
  PromptForm,
  Separator,
  VideoInputForm,
} from '@/components'
import { useState } from 'react'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState('')

  function handleSelectPrompt(template: string) {}

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 flex gap-6">
        <Main />

        <aside className="w-80 space-y-5">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <PromptForm
            onPromptSelect={handleSelectPrompt}
            temperature={temperature}
            setTemperature={setTemperature}
          />
        </aside>
      </div>
    </div>
  )
}
