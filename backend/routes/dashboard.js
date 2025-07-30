const express = require('express')
const router = express.Router()
const Dashboard = require('../models/Dashboard')

// Generate mock data
const generateMockData = () => {
  const metrics = {
    revenue: Math.floor(Math.random() * 500000) + 100000,
    revenueChange: Math.floor(Math.random() * 20) - 10,
    users: Math.floor(Math.random() * 100000) + 50000,
    usersChange: Math.floor(Math.random() * 15) - 5,
    conversionRate: Math.floor(Math.random() * 10) + 2,
    conversionChange: Math.floor(Math.random() * 8) - 4,
    growthRate: Math.floor(Math.random() * 25) + 5,
    growthChange: Math.floor(Math.random() * 10) - 5
  }

  const revenueData = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    revenueData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.random() * 50000) + 10000
    })
  }

  const trafficData = [
    { name: 'Organic Search', value: 45000, percentage: 45 },
    { name: 'Direct', value: 25000, percentage: 25 },
    { name: 'Social Media', value: 15000, percentage: 15 },
    { name: 'Referral', value: 10000, percentage: 10 },
    { name: 'Email', value: 5000, percentage: 5 }
  ]

  const conversionData = [
    { stage: 'Visitors', rate: 100 },
    { stage: 'Leads', rate: 25 },
    { stage: 'Qualified', rate: 15 },
    { stage: 'Proposals', rate: 8 },
    { stage: 'Closed', rate: 3 }
  ]

  const recentTransactions = []
  const customers = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 'David Brown', 'Lisa Anderson', 'Tom Martinez', 'Anna Garcia']
  const statuses = ['completed', 'pending', 'failed']
  
  for (let i = 1; i <= 20; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    recentTransactions.push({
      id: `TXN${String(i).padStart(4, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      amount: `$${(Math.random() * 5000 + 100).toFixed(2)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: date
    })
  }

  return {
    metrics,
    revenueData,
    trafficData,
    conversionData,
    recentTransactions
  }
}

// GET /api/dashboard
router.get('/', async (req, res) => {
  try {
    // Check if we have data in database
    let dashboardData = await Dashboard.findOne().sort({ createdAt: -1 })
    
    if (!dashboardData) {
      // Generate mock data if no data exists
      const mockData = generateMockData()
      dashboardData = new Dashboard(mockData)
      await dashboardData.save()
    }

    // Update data every 30 seconds for real-time simulation
    const now = new Date()
    const lastUpdate = dashboardData.lastUpdated
    const timeDiff = now - lastUpdate

    if (timeDiff > 30000) { // 30 seconds
      const mockData = generateMockData()
      dashboardData.set(mockData)
      dashboardData.lastUpdated = now
      await dashboardData.save()
    }

    res.json(dashboardData)
  } catch (error) {
    console.error('Dashboard data error:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
})

// POST /api/dashboard (for testing)
router.post('/', async (req, res) => {
  try {
    const mockData = generateMockData()
    const dashboardData = new Dashboard(mockData)
    await dashboardData.save()
    res.json({ message: 'Dashboard data created successfully', data: dashboardData })
  } catch (error) {
    console.error('Create dashboard data error:', error)
    res.status(500).json({ error: 'Failed to create dashboard data' })
  }
})

module.exports = router 