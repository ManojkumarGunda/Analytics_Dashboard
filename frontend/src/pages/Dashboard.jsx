import React from 'react'
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Box,
  useColorModeValue,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getDashboardData } from '../services/api'
import MetricCard from '../components/MetricCard'
import RevenueChart from '../components/charts/RevenueChart'
import TrafficChart from '../components/charts/TrafficChart'
import ConversionChart from '../components/charts/ConversionChart'
import DataTable from '../components/DataTable'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Dashboard = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Responsive values
  const gridColumns = useBreakpointValue({
    base: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(4, 1fr)'
  })
  const chartGridColumns = useBreakpointValue({
    base: '1fr',
    lg: '2fr 1fr'
  })
  const spacing = useBreakpointValue({ base: 4, md: 6, lg: 8 })

  const { data: dashboardData, isLoading, error } = useQuery(
    'dashboardData',
    getDashboardData,
    {
      refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    }
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error loading dashboard data</Text>
      </Box>
    )
  }

  const { metrics, revenueData, trafficData, conversionData, recentTransactions } = dashboardData

  return (
    <VStack spacing={spacing} align="stretch">
      {/* Page Header */}
      <Box>
        <Text 
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} 
          fontWeight="bold" 
          mb={{ base: 2, md: 3 }}
        >
          Dashboard Overview
        </Text>
        <Text 
          color="gray.500"
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Welcome back! Here's what's happening with your campaigns today.
        </Text>
      </Box>

      {/* Metrics Cards */}
      <Grid 
        templateColumns={gridColumns} 
        gap={{ base: 4, md: 6, lg: 8 }}
        w="full"
      >
        <GridItem>
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            change={metrics.revenueChange}
            icon="dollar"
            color="green"
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="Active Users"
            value={metrics.users.toLocaleString()}
            change={metrics.usersChange}
            icon="users"
            color="blue"
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change={metrics.conversionChange}
            icon="trending"
            color="purple"
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="Growth Rate"
            value={`${metrics.growthRate}%`}
            change={metrics.growthChange}
            icon="chart"
            color="orange"
          />
        </GridItem>
      </Grid>

      {/* Charts Section */}
      <Grid 
        templateColumns={chartGridColumns} 
        gap={{ base: 6, md: 8, lg: 10 }}
        minH={{ base: 'auto', lg: '400px' }}
      >
        <GridItem>
          <Box 
            bg={bg} 
            p={{ base: 4, md: 6, lg: 8 }} 
            borderRadius="xl" 
            border="1px" 
            borderColor={borderColor}
            h="full"
          >
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text 
                  fontSize={{ base: 'lg', md: 'xl' }} 
                  fontWeight="semibold" 
                  mb={2}
                >
                  Revenue Trends
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Monthly revenue performance over time
                </Text>
              </Box>
              <Box 
                h={{ base: '250px', md: '300px', lg: '350px' }}
                w="full"
              >
                <RevenueChart data={revenueData} />
              </Box>
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <VStack spacing={{ base: 4, md: 6, lg: 8 }} h="full">
            <Box 
              bg={bg} 
              p={{ base: 4, md: 6 }} 
              borderRadius="xl" 
              border="1px" 
              borderColor={borderColor}
              flex="1"
              w="full"
            >
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text 
                    fontSize={{ base: 'md', md: 'lg' }} 
                    fontWeight="semibold" 
                    mb={2}
                  >
                    Traffic Sources
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Distribution of traffic sources
                  </Text>
                </Box>
                <Box 
                  h={{ base: '200px', md: '250px', lg: '300px' }}
                  w="full"
                >
                  <TrafficChart data={trafficData} />
                </Box>
              </VStack>
            </Box>

            <Box 
              bg={bg} 
              p={{ base: 4, md: 6 }} 
              borderRadius="xl" 
              border="1px" 
              borderColor={borderColor}
              flex="1"
              w="full"
            >
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text 
                    fontSize={{ base: 'md', md: 'lg' }} 
                    fontWeight="semibold" 
                    mb={2}
                  >
                    Conversion Rate
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Conversion performance by channel
                  </Text>
                </Box>
                <Box 
                  h={{ base: '200px', md: '250px', lg: '300px' }}
                  w="full"
                >
                  <ConversionChart data={conversionData} />
                </Box>
              </VStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Recent Transactions */}
      <Box 
        bg={bg} 
        p={{ base: 4, md: 6, lg: 8 }} 
        borderRadius="xl" 
        border="1px" 
        borderColor={borderColor}
      >
        <VStack align="stretch" spacing={4}>
          <Box>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="semibold" 
              mb={2}
            >
              Recent Transactions
            </Text>
            <Text fontSize="sm" color="gray.500">
              Latest transactions and activities
            </Text>
          </Box>
          <Box 
            maxH={{ base: '300px', md: '400px' }}
            overflow="auto"
          >
            <DataTable data={recentTransactions} />
          </Box>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Dashboard 