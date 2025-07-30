import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { useColorModeValue } from '@chakra-ui/react'

const TrafficChart = ({ data }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300')
  
  const COLORS = [
    '#3182CE', // blue
    '#38A169', // green
    '#D69E2E', // yellow
    '#E53E3E', // red
    '#805AD5', // purple
    '#DD6B20', // orange
  ]

  const CustomTooltip = ({ active, payload }) => {
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
            {payload[0].name}
          </p>
          <p style={{ color: payload[0].payload.fill, margin: 0 }}>
            {payload[0].value.toLocaleString()} ({payload[0].payload.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div style={{ marginTop: '16px' }}>
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                borderRadius: '50%',
                marginRight: '8px',
              }}
            />
            <span style={{ color: textColor }}>
              {entry.value} ({data[index].percentage}%)
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TrafficChart 