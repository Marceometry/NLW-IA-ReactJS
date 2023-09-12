import { Aside, Header, Main } from '@/components'

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 flex gap-6">
        <Main />

        <Aside />
      </div>
    </div>
  )
}
