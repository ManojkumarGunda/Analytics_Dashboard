import React, { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Switch,
  Select,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  Divider,
  Avatar,
  useToast,
  useBreakpointValue,
  SimpleGrid,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getSettings, updateSettings } from '../services/api'
import { FiUser, FiBell, FiShield, FiGlobe } from 'react-icons/fi'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Settings = () => {
  const toast = useToast()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      dataSharing: false,
      analytics: true,
    },
    display: {
      theme: 'auto',
      language: 'en',
    },
  })

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@admybrand.com',
    avatar: 'https://bit.ly/dan-abramov',
  })

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Responsive values
  const spacing = useBreakpointValue({ base: 4, md: 6, lg: 8 })
  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 })
  const avatarSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' })

  const { data: userSettings, isLoading, error } = useQuery('settings', getSettings)

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)
      } catch (error) {
        console.error('Error parsing saved profile:', error)
      }
    }
  }, [])

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoDataUrl = e.target.result
        setProfile(prev => ({
          ...prev,
          avatar: photoDataUrl,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = async () => {
    try {
      await updateSettings(settings)
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleSaveProfile = () => {
    try {
      // Save profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile))
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error loading settings</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={spacing} align="stretch">
      {/* Page Header */}
      <Box>
        <Text 
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} 
          fontWeight="bold" 
          mb={{ base: 2, md: 3 }}
        >
          Settings
        </Text>
        <Text 
          color="gray.500"
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Manage your account preferences and system configuration.
        </Text>
      </Box>

      {/* Profile Settings */}
      <Box bg={bg} p={padding} borderRadius="xl" border="1px" borderColor={borderColor}>
        <HStack spacing={3} mb={4}>
          <FiUser />
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="semibold">
            Profile Settings
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} align="flex-start">
            <Avatar size={avatarSize} name={`${profile.firstName} ${profile.lastName}`} src={profile.avatar} />
            <VStack align="start" spacing={2} flex="1">
              <Text fontWeight="semibold" fontSize={{ base: 'md', md: 'lg' }}>
                {`${profile.firstName} ${profile.lastName}`}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500">
                {profile.email}
              </Text>
              <HStack spacing={2}>
                <Button 
                  size={buttonSize} 
                  variant="outline" 
                  onClick={() => document.getElementById('photo-input').click()}
                >
                  Change Photo
                </Button>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </HStack>
            </VStack>
          </HStack>
          <Divider />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel fontSize={{ base: 'sm', md: 'md' }}>First Name</FormLabel>
              <Input 
                value={profile.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                placeholder="Enter first name"
                size={buttonSize}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Last Name</FormLabel>
              <Input 
                value={profile.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                placeholder="Enter last name"
                size={buttonSize}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Email</FormLabel>
            <Input 
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              type="email"
              placeholder="Enter email address"
              size={buttonSize}
            />
          </FormControl>
          <HStack justify="end">
            <Button colorScheme="brand" onClick={handleSaveProfile} size={buttonSize}>
              Save Profile
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Notification Settings */}
      <Box bg={bg} p={padding} borderRadius="xl" border="1px" borderColor={borderColor}>
        <HStack spacing={3} mb={4}>
          <FiBell />
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="semibold">
            Notification Preferences
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                Email Notifications
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                Receive updates via email
              </Text>
            </Box>
            <Switch
              isChecked={settings.notifications.email}
              onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                Push Notifications
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                Receive push notifications in browser
              </Text>
            </Box>
            <Switch
              isChecked={settings.notifications.push}
              onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                SMS Notifications
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                Receive updates via SMS
              </Text>
            </Box>
            <Switch
              isChecked={settings.notifications.sms}
              onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
        </VStack>
      </Box>

      {/* Privacy Settings */}
      <Box bg={bg} p={padding} borderRadius="xl" border="1px" borderColor={borderColor}>
        <HStack spacing={3} mb={4}>
          <FiShield />
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="semibold">
            Privacy & Security
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                Data Sharing
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                Allow data sharing for analytics
              </Text>
            </Box>
            <Switch
              isChecked={settings.privacy.dataSharing}
              onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>
                Analytics Tracking
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                Allow analytics and performance tracking
              </Text>
            </Box>
            <Switch
              isChecked={settings.privacy.analytics}
              onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
        </VStack>
      </Box>

      {/* Save Button */}
      <HStack justify="end" spacing={3}>
        <Button variant="outline" size={buttonSize}>Cancel</Button>
        <Button colorScheme="brand" onClick={handleSaveSettings} size={buttonSize}>
          Save Changes
        </Button>
      </HStack>
    </VStack>
  )
}

export default Settings 