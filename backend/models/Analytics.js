const mongoose = require('mongoose')

const analyticsSchema = new mongoose.Schema({
  dateRange: {
    type: String,
    required: true,
    enum: ['7d', '30d', '90d', '1y']
  },
  metric: {
    type: String,
    required: true,
    enum: ['revenue', 'users', 'conversions', 'sessions']
  },
  groupBy: {
    type: String,
    required: true,
    enum: ['hour', 'day', 'week', 'month']
  },
  trends: [{
    date: {
      type: String,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    },
    users: {
      type: Number,
      required: true
    },
    conversions: {
      type: Number,
      required: true
    },
    sessions: {
      type: Number,
      required: true
    }
  }],
  traffic: [{
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
  conversion: [{
    stage: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    }
  }],
  geographic: [{
    country: {
      type: String,
      required: true
    },
    users: {
      type: Number,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    }
  }],
  devices: [{
    device: {
      type: String,
      required: true
    },
    users: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
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

module.exports = mongoose.model('Analytics', analyticsSchema) 