import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { formatUSD } from '../utils/formatters'

interface MarketChartProps {
  prices: number[]
}

export const MarketChart = ({ prices }: MarketChartProps) => {
  const data = prices.map((value, index) => ({
    day: `D-${prices.length - index}`,
    value,
  }))

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Bitcoin - 7 Day Trend</h2>
        <p className="text-sm text-zinc-400">Price evolution with CoinGecko sparkline data</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="btcArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="day" tick={{ fill: '#a1a1aa', fontSize: 11 }} tickLine={false} />
            <Tooltip
              formatter={(value) => formatUSD(Number(value ?? 0))}
              contentStyle={{
                background: '#09090b',
                border: '1px solid #3f3f46',
                borderRadius: '0.75rem',
                color: '#fafafa',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#btcArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
