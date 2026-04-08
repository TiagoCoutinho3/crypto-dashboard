import type { CryptoAsset } from '../types/crypto'
import { formatUSD } from '../utils/formatters'

interface CryptoTableProps {
  coins: CryptoAsset[]
}

export const CryptoTable = ({ coins }: CryptoTableProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Top 10 Coins</h2>
        <p className="text-sm text-zinc-400">Live market ranking by market cap</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-zinc-400">
            <tr className="border-b border-zinc-800">
              <th className="px-3 py-3 text-left">Rank</th>
              <th className="px-3 py-3 text-left">Name</th>
              <th className="px-3 py-3 text-right">Price</th>
              <th className="px-3 py-3 text-right">Volume</th>
              <th className="px-3 py-3 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b border-zinc-900/80 text-zinc-200">
                <td className="px-3 py-3">{coin.market_cap_rank}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-xs uppercase text-zinc-400">{coin.symbol}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-right">{formatUSD(coin.current_price)}</td>
                <td className="px-3 py-3 text-right">{formatUSD(coin.total_volume)}</td>
                <td className="px-3 py-3 text-right">{formatUSD(coin.market_cap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
