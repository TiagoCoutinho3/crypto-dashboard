import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { formatPercentage, formatUSD } from '../utils/formatters'

interface CryptoCardProps {
  id: string
  name: string
  symbol: string
  currentPrice: number
  change24h: number
  isSelected: boolean
  onSelect: (coinId: string) => void
}

export const CryptoCard = ({
  id,
  name,
  symbol,
  currentPrice,
  change24h,
  isSelected,
  onSelect,
}: CryptoCardProps) => {
  const isPositive = change24h >= 0

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-full rounded-2xl border bg-zinc-900/70 p-5 text-left shadow-lg shadow-black/20 backdrop-blur transition ${
        isSelected
          ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}
    >
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
      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
        </span>
        Live
      </div>
    </button>
  )
}
