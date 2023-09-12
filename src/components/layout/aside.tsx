import { FileVideo, Upload, Wand2 } from 'lucide-react'
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Textarea,
} from '@/components'

export const Aside = () => {
  return (
    <aside className="w-80 space-y-6">
      <form className="space-y-6">
        <label
          htmlFor="video"
          className="flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed text-sm text-muted-foreground aspect-video cursor-pointer hover:bg-primary/10 transition-colors"
        >
          <FileVideo className="w-4 h-4" />
          Carregar vídeo
        </label>
        <input type="file" id="video" accept="video/mp4" className="sr-only" />

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
          <Textarea
            id="transcription_prompt"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
            className="h-20 leading-relaxed"
          />
        </div>

        <Button type="submit" className="w-full transition-colors">
          Carregar vídeo
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <Separator />

      <form className="space-y-5">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Título do Youtube</SelectItem>
              <SelectItem value="description">Descrição do Youtube</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Modelo</Label>
          <Select disabled defaultValue="gpt3.5">
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt3.5">GPT 2.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar essa opção em breve
          </span>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Temperatura</Label>
          <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />
          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tentem a deixar o resultado mais criativo e com
            possíveis erros
          </span>
        </div>

        <Separator />

        <Button type="submit" className="w-full">
          Executar
          <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </aside>
  )
}
