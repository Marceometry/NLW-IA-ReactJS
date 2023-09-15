import { Textarea } from '@/components'

type Props = {
  template: string
  setTemplate: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  completion: string
}

export const Main = ({ template, setTemplate, completion }: Props) => {
  return (
    <main className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={template}
          onChange={setTemplate}
        />
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Resultado gerado pela IA..."
          value={completion}
          readOnly
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável{' '}
        <code className="text-violet-400">{'{transcription}'}</code> no seu
        prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>
    </main>
  )
}
