import React, { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Box,
  Text,
  Select,
  Input,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getAnalyticsData } from '../services/api'
import RevenueChart from '../components/charts/RevenueChart'
import TrafficChart from '../components/charts/TrafficChart'
import ConversionChart from '../components/charts/ConversionChart'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Analytics = () => {
  // All hooks must be called in the same order every time
  const toast = useToast()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const filterBg = useColorModeValue('gray.50', 'gray.700')

  const [filters, setFilters] = useState({
    dateRange: '30d',
    metric: 'revenue',
    groupBy: 'day',
  })

  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: '30d',
    metric: 'revenue',
    groupBy: 'day',
  })

  const [autoApply, setAutoApply] = useState(false)

  // Auto-apply filters when they change
  useEffect(() => {
    if (autoApply) {
      setAppliedFilters(filters)
      showFilterNotification('Auto-applied', filters)
    }
  }, [filters, autoApply])

  const { data: analyticsData, isLoading, error, refetch } = useQuery(
    ['analytics', appliedFilters],
    () => getAnalyticsData(appliedFilters),
    {
      refetchInterval: 60000, // Refetch every minute
      refetchOnWindowFocus: false,
    }
  )

  const showFilterNotification = (action, filterData) => {
    const filterText = `Date: ${filterData.dateRange} | Metric: ${filterData.metric} | Group: ${filterData.groupBy}`
    
    toast({
      title: `Filters ${action}`,
      description: filterText,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setAppliedFilters(filters)
    showFilterNotification('Applied', filters)
  }

  const handleResetFilters = () => {
    const defaultFilters = {
      dateRange: '30d',
      metric: 'revenue',
      groupBy: 'day',
    }
    setFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
    
    toast({
      title: 'Filters Reset',
      description: 'All filters have been reset to default values',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const handleRefresh = () => {
    refetch()
    toast({
      title: 'Data Refreshed',
      description: 'Analytics data has been refreshed',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    })
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500" fontSize="lg" mb={4}>
          Error loading analytics data
        </Text>
        <Text color="gray.500" mb={4}>
          {error.message || 'Please check your connection and try again.'}
        </Text>
        <Button 
          colorScheme="brand" 
          onClick={() => refetch()}
          isLoading={isLoading}
        >
          Retry
        </Button>
      </Box>
    )
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Page Header */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Analytics
        </Text>
        <Text color="gray.500">
          Deep dive into your campaign performance and user behavior.
        </Text>
      </Box>

      {/* Filters */}
      <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
        <HStack spacing={4} wrap="wrap" mb={4}>
          <Select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            w="150px"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </Select>
          
          <Select
            value={filters.metric}
            onChange={(e) => handleFilterChange('metric', e.target.value)}
            w="150px"
          >
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="conversions">Conversions</option>
            <option value="sessions">Sessions</option>
          </Select>
          
          <Select
            value={filters.groupBy}
            onChange={(e) => handleFilterChange('groupBy', e.target.value)}
            w="120px"
          >
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Select>
        </HStack>
        
        <HStack spacing={3} mb={4}>
          <Button 
            colorScheme="brand" 
            size="sm"
            onClick={handleApplyFilters}
            isLoading={isLoading}
            isDisabled={autoApply}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            isLoading={isLoading}
          >
            Refresh
          </Button>
          <Checkbox
            isChecked={autoApply}
            onChange={(e) => setAutoApply(e.target.checked)}
            size="sm"
          >
            Auto-apply
          </Checkbox>
        </HStack>
        
        {/* Show current applied filters */}
        <Box 
          bg={filterBg} 
          p={3} 
          borderRadius="md"
          fontSize="sm"
        >
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontWeight="semibold" mb={1}>Applied Filters:</Text>
              <Text color="gray.600">
                Date Range: {appliedFilters.dateRange} | 
                Metric: {appliedFilters.metric} | 
                Group By: {appliedFilters.groupBy}
              </Text>
            </Box>
            {isLoading && (
              <Text color="brand.500" fontSize="xs">
                Loading...
              </Text>
            )}
          </HStack>
        </Box>
      </Box>

      {/* Analytics Charts */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem>
          <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Performance Trends
            </Text>
            <RevenueChart data={analyticsData?.trends || []} />
          </Box>
        </GridItem>
        <GridItem>
          <VStack spacing={6}>
            <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Traffic Sources
              </Text>
              <TrafficChart data={analyticsData?.traffic || []} />
            </Box>
            <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Conversion Funnel
              </Text>
              <ConversionChart data={analyticsData?.conversion || []} />
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Additional Analytics Sections */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Geographic Distribution
            </Text>
            <Text color="gray.500">Geographic analytics coming soon...</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Device Analytics
            </Text>
            <Text color="gray.500">Device analytics coming soon...</Text>
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default Analytics 