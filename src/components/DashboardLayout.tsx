import { BarChart3, BriefcaseBusiness, Settings } from 'lucide-react'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  topCards: ReactNode
  marketSection: ReactNode
}

const navItems = [
  { label: 'Dashboard', icon: BarChart3, active: true },
  { label: 'Portfolio', icon: BriefcaseBusiness, active: false },
  { label: 'Settings', icon: Settings, active: false },
]

export const DashboardLayout = ({ topCards, marketSection }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-800 bg-zinc-900/40 p-6 lg:min-h-screen lg:border-b-0 lg:border-r">
          <h1 className="mb-10 text-2xl font-bold tracking-tight text-emerald-400">
            CryptoDash
          </h1>
          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100'
                }`}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {topCards}
          </section>
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1.8fr]">
            {marketSection}
          </section>
        </main>
      </div>
    </div>
  )
}
