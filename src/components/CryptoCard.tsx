import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { formatPercentage, formatUSD } from '../utils/formatters'

interface CryptoCardProps {
  name: string
  symbol: string
  currentPrice: number
  change24h: number
}

export const CryptoCard = ({
  name,
  symbol,
  currentPrice,
  change24h,
}: CryptoCardProps) => {
  const isPositive = change24h >= 0

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{name}</p>
          <p className="text-xl font-semibold text-zinc-100">{symbol.toUpperCase()}</p>
        </div>
        <div
          className={`rounded-full p-2 ${
            isPositive
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
        </div>
      </div>

      <p className="text-2xl font-bold tracking-tight text-zinc-50">
        {formatUSD(currentPrice)}
      </p>
      <p
        className={`mt-2 text-sm font-medium ${
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {formatPercentage(change24h)} (24h)
      </p>
    </article>
  )
}
