const express = require('express')
const router = express.Router()
const Analytics = require('../models/Analytics')

// Generate mock analytics data based on filters
const generateAnalyticsData = (filters) => {
  const { dateRange, metric, groupBy } = filters

  // Generate trends data based on date range
  const trends = []
  let days = 30
  if (dateRange === '7d') days = 7
  else if (dateRange === '90d') days = 90
  else if (dateRange === '1y') days = 365

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    trends.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      users: Math.floor(Math.random() * 5000) + 1000,
      conversions: Math.floor(Math.random() * 500) + 50,
      sessions: Math.floor(Math.random() * 10000) + 2000
    })
  }

  // Traffic sources data
  const traffic = [
    { name: 'Organic Search', value: 45000, percentage: 45 },
    { name: 'Direct', value: 25000, percentage: 25 },
    { name: 'Social Media', value: 15000, percentage: 15 },
    { name: 'Referral', value: 10000, percentage: 10 },
    { name: 'Email', value: 5000, percentage: 5 }
  ]

  // Recalculate percentages based on actual values
  const totalTraffic = traffic.reduce((sum, item) => sum + item.value, 0)
  traffic.forEach(item => {
    item.percentage = Math.round((item.value / totalTraffic) * 100)
  })

  // Conversion funnel data
  const conversion = [
    { stage: 'Visitors', rate: 100 },
    { stage: 'Leads', rate: 25 },
    { stage: 'Qualified', rate: 15 },
    { stage: 'Proposals', rate: 8 },
    { stage: 'Closed', rate: 3 }
  ]

  // Geographic data
  const geographic = [
    { country: 'United States', users: 25000, revenue: 150000 },
    { country: 'United Kingdom', users: 8000, revenue: 45000 },
    { country: 'Canada', users: 6000, revenue: 35000 },
    { country: 'Germany', users: 5000, revenue: 28000 },
    { country: 'Australia', users: 4000, revenue: 22000 }
  ]

  // Device data
  const devices = [
    { device: 'Desktop', users: 35000, percentage: 50 },
    { device: 'Mobile', users: 28000, percentage: 40 },
    { device: 'Tablet', users: 7000, percentage: 10 }
  ]

  return {
    dateRange,
    metric,
    groupBy,
    trends,
    traffic,
    conversion,
    geographic,
    devices,
    lastUpdated: new Date()
  }
}

// GET /api/analytics
router.get('/', async (req, res) => {
  try {
    const { dateRange = '30d', metric = 'revenue', groupBy = 'day' } = req.query

    // Check if we have data for these filters
    let analyticsData = await Analytics.findOne({
      dateRange,
      metric,
      groupBy
    }).sort({ createdAt: -1 })

    if (!analyticsData) {
      // Generate mock data if no data exists for these filters
      const mockData = generateAnalyticsData({ dateRange, metric, groupBy })
      analyticsData = new Analytics(mockData)
      await analyticsData.save()
    }

    // Update data every minute for real-time simulation
    const now = new Date()
    const lastUpdate = analyticsData.lastUpdated
    const timeDiff = now - lastUpdate

    if (timeDiff > 60000) { // 1 minute
      const mockData = generateAnalyticsData({ dateRange, metric, groupBy })
      analyticsData.set(mockData)
      analyticsData.lastUpdated = now
      await analyticsData.save()
    }

    res.json(analyticsData)
  } catch (error) {
    console.error('Analytics data error:', error)
    res.status(500).json({ error: 'Failed to fetch analytics data' })
  }
})

// POST /api/analytics (for testing)
router.post('/', async (req, res) => {
  try {
    const { dateRange = '30d', metric = 'revenue', groupBy = 'day' } = req.body
    const mockData = generateAnalyticsData({ dateRange, metric, groupBy })
    const analyticsData = new Analytics(mockData)
    await analyticsData.save()
    res.json({ message: 'Analytics data created successfully', data: analyticsData })
  } catch (error) {
    console.error('Create analytics data error:', error)
    res.status(500).json({ error: 'Failed to create analytics data' })
  }
})

module.exports = router 