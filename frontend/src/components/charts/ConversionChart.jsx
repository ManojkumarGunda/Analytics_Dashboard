import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useColorModeValue } from '@chakra-ui/react'

const ConversionChart = ({ data }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const gridColor = useColorModeValue('gray.200', 'gray.700')
  const barColor = useColorModeValue('brand.500', 'brand.200')

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
          <p style={{ color: barColor, margin: 0 }}>
            Conversion Rate: {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="stage"
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="rate"
          fill={barColor}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ConversionChart 