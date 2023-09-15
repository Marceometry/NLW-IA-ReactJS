import { Wand2 } from 'lucide-react'
import {
  Separator,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from '@/components'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

type Prompt = {
  id: string
  title: string
  template: string
}

type Props = {
  temperature: number
  setTemperature: (value: number) => void
  onPromptSelect: (template: string) => void
}

export function PromptForm({
  onPromptSelect,
  temperature,
  setTemperature,
}: Props) {
  const [prompts, setPrompts] = useState<Prompt[]>([])

  async function getPrompts() {
    try {
      const { data } = await api.get('/prompts')
      setPrompts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPrompts()
  }, [])

  function handleSelectPrompt(id: string) {
    const prompt = prompts.find((prompt) => prompt.id === id)
    if (!prompt) return

    onPromptSelect(prompt.template)
  }

  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <Select onValueChange={handleSelectPrompt}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt..." />
          </SelectTrigger>
          <SelectContent>
            {prompts.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id}>
                {prompt.title}
              </SelectItem>
            ))}
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
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>
        <span className="block text-xs text-muted-foreground italic">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Temperatura</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(values) => setTemperature(values[0])}
        />
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
  )
}
