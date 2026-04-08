import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { CryptoAsset } from '../types/crypto'

const TOP_COINS_QUERY_KEY = ['top-coins']

const fetchTopCoins = async (): Promise<CryptoAsset[]> => {
  const { data } = await api.get<CryptoAsset[]>(
    '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
  )
  return data
}

export const useTopCoins = () =>
  useQuery({
    queryKey: TOP_COINS_QUERY_KEY,
    queryFn: fetchTopCoins,
    staleTime: 60_000,
    retry: 1,
  })

type ChartPeriod = '1' | '7' | '30' | '365'

interface CoinChartResponse {
  prices: [number, number][]
}

export const useCoinChartData = (coinId: string, days: ChartPeriod) =>
  useQuery({
    queryKey: ['coin-chart', coinId, days],
    queryFn: async () => {
      const { data } = await api.get<CoinChartResponse>(
        `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      )
      return data.prices
    },
    enabled: Boolean(coinId),
    staleTime: 60_000,
    retry: 1,
  })

export type { ChartPeriod }
