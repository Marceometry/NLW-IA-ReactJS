import { PromptForm, Separator, VideoInputForm } from '@/components'

export const Aside = () => {
  return (
    <aside className="w-80 space-y-5">
      <VideoInputForm />

      <Separator />

      <PromptForm />
    </aside>
  )
}
