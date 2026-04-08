import { LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CryptoCard } from '../components/CryptoCard'
import { CryptoTable } from '../components/CryptoTable'
import { MarketChart } from '../components/MarketChart'
import type { ChartPeriod } from '../hooks/useCryptoData'
import { useTopCoins } from '../hooks/useCryptoData'

const cardsSkeleton = Array.from({ length: 4 })

export const DashboardPage = () => {
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin')
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('7')
  const { data: coins = [], isLoading, isError } = useTopCoins()

  const selectedCoin = useMemo(
    () => coins.find((coin) => coin.id === selectedCoinId) ?? coins[0],
    [coins, selectedCoinId],
  )

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6 text-zinc-100">
        <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          Failed to load market data. Please refresh in a moment.
        </p>
      </div>
    )
  }

  return (
    <>
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? cardsSkeleton.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-[178px] animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/80"
              />
            ))
          : coins.slice(0, 4).map((coin) => (
              <CryptoCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                currentPrice={coin.current_price}
                change24h={coin.price_change_percentage_24h}
                isSelected={selectedCoinId === coin.id}
                onSelect={setSelectedCoinId}
              />
            ))}
      </section>

      {isLoading ? (
        <div className="col-span-full flex h-64 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="flex items-center gap-3 text-zinc-300">
            <LoaderCircle className="animate-spin text-emerald-400" size={20} />
            Loading market data...
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1.8fr]">
          <MarketChart
            selectedCoinId={selectedCoin?.id ?? 'bitcoin'}
            selectedCoinName={selectedCoin?.name ?? 'Bitcoin'}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
          <CryptoTable
            coins={coins}
            selectedCoinId={selectedCoinId}
            onSelectCoin={setSelectedCoinId}
          />
        </section>
      )}
    </>
  )
}
