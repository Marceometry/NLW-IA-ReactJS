import { useState } from 'react'
import { useCompletion } from 'ai/react'
import {
  Header,
  Main,
  PromptForm,
  Separator,
  VideoInputForm,
} from '@/components'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState('')

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${import.meta.env.VITE_APP_API_URL}/ai/complete`,
    body: { videoId, temperature },
    headers: { 'Content-type': 'application/json' },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 flex gap-6">
        <Main
          template={input}
          setTemplate={handleInputChange}
          completion={completion}
        />

        <aside className="w-80 space-y-5">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <PromptForm
            onPromptSelect={setInput}
            temperature={temperature}
            setTemperature={setTemperature}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </aside>
      </div>
    </div>
  )
}
