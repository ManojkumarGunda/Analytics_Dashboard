const express = require('express')
const router = express.Router()

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    // Mock user settings
    const settings = {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@admybrand.com',
        avatar: 'https://bit.ly/dan-abramov',
        role: 'Admin',
        company: 'ADmyBRAND'
      },
      notifications: {
        email: true,
        push: false,
        sms: false,
        frequency: 'daily'
      },
      privacy: {
        dataSharing: false,
        analytics: true,
        marketing: false
      },
      display: {
        theme: 'auto',
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY'
      },
      integrations: {
        googleAnalytics: true,
        facebookPixel: false,
        hotjar: true,
        mailchimp: false
      },
      preferences: {
        dashboardRefresh: 30, // seconds
        defaultDateRange: '30d',
        exportFormat: 'pdf',
        autoSave: true
      }
    }

    res.json(settings)
  } catch (error) {
    console.error('Settings error:', error)
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    const updatedSettings = req.body

    // Validate settings
    if (!updatedSettings) {
      return res.status(400).json({ error: 'Settings data is required' })
    }

    // Here you would typically save to database
    // For now, we'll just return success
    const savedSettings = {
      ...updatedSettings,
      updatedAt: new Date().toISOString()
    }

    res.json({
      message: 'Settings updated successfully',
      settings: savedSettings
    })
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// GET /api/settings/profile
router.get('/profile', async (req, res) => {
  try {
    const profile = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@admybrand.com',
      avatar: 'https://bit.ly/dan-abramov',
      role: 'Admin',
      company: 'ADmyBRAND',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Digital marketing specialist with 5+ years of experience in analytics and campaign optimization.',
      joinedAt: '2023-01-15T00:00:00.000Z',
      lastLogin: new Date().toISOString()
    }

    res.json(profile)
  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// PUT /api/settings/profile
router.put('/profile', async (req, res) => {
  try {
    const updatedProfile = req.body

    // Validate profile data
    if (!updatedProfile.firstName || !updatedProfile.lastName || !updatedProfile.email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' })
    }

    // Here you would typically save to database
    const savedProfile = {
      ...updatedProfile,
      updatedAt: new Date().toISOString()
    }

    res.json({
      message: 'Profile updated successfully',
      profile: savedProfile
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// GET /api/settings/notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = {
      email: {
        enabled: true,
        frequency: 'daily',
        types: ['reports', 'alerts', 'updates']
      },
      push: {
        enabled: false,
        types: ['reports', 'alerts']
      },
      sms: {
        enabled: false,
        phone: '+1 (555) 123-4567'
      },
      alerts: {
        revenueThreshold: 10000,
        userThreshold: 1000,
        conversionThreshold: 5
      }
    }

    res.json(notifications)
  } catch (error) {
    console.error('Notifications error:', error)
    res.status(500).json({ error: 'Failed to fetch notification settings' })
  }
})

// PUT /api/settings/notifications
router.put('/notifications', async (req, res) => {
  try {
    const updatedNotifications = req.body

    // Here you would typically save to database
    const savedNotifications = {
      ...updatedNotifications,
      updatedAt: new Date().toISOString()
    }

    res.json({
      message: 'Notification settings updated successfully',
      notifications: savedNotifications
    })
  } catch (error) {
    console.error('Update notifications error:', error)
    res.status(500).json({ error: 'Failed to update notification settings' })
  }
})

module.exports = router 