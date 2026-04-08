import { LoaderCircle } from 'lucide-react'
import { CryptoCard } from './components/CryptoCard'
import { CryptoTable } from './components/CryptoTable'
import { DashboardLayout } from './components/DashboardLayout'
import { MarketChart } from './components/MarketChart'
import { useTopCoins } from './hooks/useCryptoData'

const cardsSkeleton = Array.from({ length: 4 })

function App() {
  const { data: coins = [], isLoading, isError } = useTopCoins()

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
        <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          Failed to load market data. Please refresh in a moment.
        </p>
      </main>
    )
  }

  const topCards = isLoading
    ? cardsSkeleton.map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-[146px] animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/80"
        />
      ))
    : coins
        .slice(0, 4)
        .map((coin) => (
          <CryptoCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            currentPrice={coin.current_price}
            change24h={coin.price_change_percentage_24h}
          />
        ))

  const marketSection = isLoading ? (
    <div className="col-span-full flex h-64 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70">
      <div className="flex items-center gap-3 text-zinc-300">
        <LoaderCircle className="animate-spin text-emerald-400" size={20} />
        Loading market data...
      </div>
    </div>
  ) : (
    <>
      <MarketChart prices={coins[0]?.sparkline_in_7d?.price ?? []} />
      <CryptoTable coins={coins} />
    </>
  )

  return <DashboardLayout topCards={topCards} marketSection={marketSection} />
}

export default App
