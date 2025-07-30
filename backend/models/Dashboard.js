const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
  metrics: {
    revenue: {
      type: Number,
      required: true,
      default: 0
    },
    revenueChange: {
      type: Number,
      required: true,
      default: 0
    },
    users: {
      type: Number,
      required: true,
      default: 0
    },
    usersChange: {
      type: Number,
      required: true,
      default: 0
    },
    conversionRate: {
      type: Number,
      required: true,
      default: 0
    },
    conversionChange: {
      type: Number,
      required: true,
      default: 0
    },
    growthRate: {
      type: Number,
      required: true,
      default: 0
    },
    growthChange: {
      type: Number,
      required: true,
      default: 0
    }
  },
  revenueData: [{
    date: {
      type: String,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    }
  }],
  trafficData: [{
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    }
  }],
  conversionData: [{
    stage: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    }
  }],
  recentTransactions: [{
    id: {
      type: String,
      required: true
    },
    customer: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['completed', 'pending', 'failed']
    },
    date: {
      type: Date,
      required: true
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Dashboard', dashboardSchema) 