import { Github } from 'lucide-react'
import { Button, Separator } from '@/components'

export const Header = () => {
  return (
    <header className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">
        <a href="">upload.ai</a>
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido por Marcelino Teixeira
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="outline">
          <Github className="w-4 h-4 mr-2" />
          Github
        </Button>
      </div>
    </header>
  )
}
