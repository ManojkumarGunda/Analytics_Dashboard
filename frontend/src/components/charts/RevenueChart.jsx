import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { useColorModeValue } from '@chakra-ui/react'

const RevenueChart = ({ data }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const gridColor = useColorModeValue('gray.200', 'gray.700')
  const strokeColor = useColorModeValue('brand.500', 'brand.200')
  const fillColor = useColorModeValue('brand.50', 'brand.900')

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: useColorModeValue('white', 'gray.800'),
            border: `1px solid ${useColorModeValue('gray.200', 'gray.700')}`,
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ color: textColor, margin: '0 0 8px 0', fontWeight: 'bold' }}>
            {label}
          </p>
          <p style={{ color: strokeColor, margin: 0 }}>
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="date"
          stroke={textColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={textColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={strokeColor}
          strokeWidth={3}
          fill="url(#colorRevenue)"
          dot={{ fill: strokeColor, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: strokeColor, strokeWidth: 2, fill: 'white' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default RevenueChart 