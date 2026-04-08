import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { LoaderCircle } from 'lucide-react'
import { formatUSD } from '../utils/formatters'
import { useCoinChartData } from '../hooks/useCryptoData'
import type { ChartPeriod } from '../hooks/useCryptoData'

interface MarketChartProps {
  selectedCoinId: string
  selectedCoinName: string
  selectedPeriod: ChartPeriod
  onPeriodChange: (period: ChartPeriod) => void
}

const periods: Array<{ label: string; value: ChartPeriod }> = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '1M', value: '30' },
  { label: '1Y', value: '365' },
]

const xAxisLabel = (timestamp: number) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

const compactUsd = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

export const MarketChart = ({
  selectedCoinId,
  selectedCoinName,
  selectedPeriod,
  onPeriodChange,
}: MarketChartProps) => {
  const {
    data: prices = [],
    isLoading,
    isFetching,
    isError,
  } = useCoinChartData(selectedCoinId, selectedPeriod)

  const points = prices.map(([timestamp, value]) => ({
    timestamp,
    value,
  }))

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          {selectedCoinName} - {periods.find((period) => period.value === selectedPeriod)?.label}{' '}
          Trend
        </h2>
        <p className="text-sm text-zinc-400">Price evolution with CoinGecko sparkline data</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => onPeriodChange(period.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                selectedPeriod === period.value
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-zinc-300">
            <div className="flex items-center gap-3">
              <LoaderCircle className="animate-spin text-emerald-400" size={20} />
              Loading chart...
            </div>
          </div>
        ) : (
          <ResponsiveContainer>
            <AreaChart key={`${selectedCoinId}-${selectedPeriod}`} data={points}>
              <defs>
                <linearGradient id="btcArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  selectedPeriod === '1'
                    ? new Intl.DateTimeFormat('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(Number(value)))
                    : xAxisLabel(Number(value))
                }
                minTickGap={28}
                tick={{ fill: '#a1a1aa', fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => compactUsd(Number(value))}
                tick={{ fill: '#a1a1aa', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={52}
              />
              <ChartTooltip
                labelFormatter={(value) =>
                  selectedPeriod === '1'
                    ? new Intl.DateTimeFormat('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(Number(value)))
                    : xAxisLabel(Number(value))
                }
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
        )}
      </div>
      {isFetching && !isLoading ? (
        <p className="mt-3 text-xs text-zinc-400">Updating chart...</p>
      ) : null}
      {isError ? (
        <p className="mt-2 text-xs text-rose-300">
          Could not update this period right now (CoinGecko rate limit). Try again in a few
          seconds.
        </p>
      ) : null}
    </section>
  )
}
