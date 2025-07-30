import React, { useState } from 'react'
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Select,
  useColorModeValue,
  Grid,
  GridItem,
  Badge,
  IconButton,
  Input,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { useQuery, useMutation } from 'react-query'
import { getReports, exportData, generateReport } from '../services/api'
import { FiDownload, FiEye, FiCalendar, FiFilter } from 'react-icons/fi'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Reports = () => {
  // All hooks must be called in the same order every time
  const toast = useToast()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const filterBg = useColorModeValue('gray.50', 'gray.700')
  const filterBorderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const filterTextBg = useColorModeValue('white', 'gray.600')
  
  const [selectedReport, setSelectedReport] = useState('')
  const [exportFormat, setExportFormat] = useState('pdf')
  const [filters, setFilters] = useState({
    dateRange: '30d',
    metric: 'revenue',
    groupBy: 'day',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const { data: reports, isLoading, error } = useQuery('reports', getReports)

  // Mutation for generating reports
  const generateReportMutation = useMutation(
    async ({ reportType, format, filters }) => {
      return generateReport({
        reportType,
        format,
        dateRange: filters.dateRange,
        metric: filters.metric,
        groupBy: filters.groupBy,
      })
    },
    {
      onSuccess: (data) => {
        // Trigger download with proper handling
        if (data.report?.downloadUrl) {
          handleDownload(data.report.downloadUrl, data.report.format)
        } else {
          toast({
            title: 'Report Generated',
            description: 'Your report has been generated successfully!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          })
        }
      },
      onError: (error) => {
        toast({
          title: 'Generation Failed',
          description: error.message || 'Failed to generate report. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      },
    }
  )

  const handleDownload = async (downloadUrl, format) => {
    try {
      const response = await fetch(downloadUrl)
      
      if (!response.ok) {
        throw new Error('Download failed')
      }
      
      // Get the filename from the response headers or create one
      const contentDisposition = response.headers.get('content-disposition')
      let filename = `report_${Date.now()}.${format}`
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }
      
      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      // Show single notification for successful generation and download
      toast({
        title: 'Download Successful',
        description: format.toLowerCase() === 'pdf' 
          ? 'PDF download successfully' 
          : `${format.toUpperCase()} download successfully`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      console.error('Download error:', error)
      toast({
        title: 'Download Failed',
        description: 'Failed to download the report. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleGenerateReport = async () => {
    if (!selectedReport) {
      toast({
        title: 'No Report Selected',
        description: 'Please select a report type to generate.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      return
    }

    setIsGenerating(true)
    try {
      await generateReportMutation.mutateAsync({
        reportType: selectedReport,
        format: exportFormat,
        filters,
      })
    } catch (error) {
      console.error('Report generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = async (reportId, format) => {
    try {
      await exportData(format, { reportId })
      toast({
        title: 'Export Successful',
        description: 'Report exported successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export report. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    
    // Show notification for filter change
    toast({
      title: 'Filter Updated',
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} changed to ${value}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const handleResetFilters = () => {
    setFilters({
      dateRange: '30d',
      metric: 'revenue',
      groupBy: 'day',
    })
    
    toast({
      title: 'Filters Reset',
      description: 'All report filters have been reset to default values',
      status: 'info',
      duration: 3000,
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
        <Text color="red.500">Error loading reports</Text>
      </Box>
    )
  }

  const reportTypes = [
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Monthly revenue analysis and trends',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      status: 'available',
    },
    {
      id: 'users',
      name: 'User Analytics Report',
      description: 'User behavior and engagement metrics',
      frequency: 'Weekly',
      lastGenerated: '2024-01-20',
      status: 'available',
    },
    {
      id: 'conversions',
      name: 'Conversion Report',
      description: 'Conversion funnel and optimization insights',
      frequency: 'Daily',
      lastGenerated: '2024-01-21',
      status: 'available',
    },
    {
      id: 'campaigns',
      name: 'Campaign Performance Report',
      description: 'Campaign ROI and performance metrics',
      frequency: 'Weekly',
      lastGenerated: '2024-01-18',
      status: 'available',
    },
  ]

  return (
    <VStack spacing={6} align="stretch">
      {/* Page Header */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Reports
        </Text>
        <Text color="gray.500">
          Generate and download comprehensive reports for your campaigns.
        </Text>
      </Box>

      {/* Report Generation */}
      <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Generate New Report
        </Text>
        
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} wrap="wrap">
            <Select
              placeholder="Select report type"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              w="250px"
            >
              {reportTypes.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </Select>
            
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              w="120px"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
            </Select>
            
            <Button
              colorScheme="brand"
              leftIcon={<FiFilter />}
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            
            <Button
              colorScheme="brand"
              leftIcon={<FiDownload />}
              isDisabled={!selectedReport}
              isLoading={isGenerating}
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
          </HStack>

          {/* Filters Section */}
          {showFilters && (
            <Box 
              bg={filterBg} 
              p={4} 
              borderRadius="md"
              border="1px"
              borderColor={filterBorderColor}
            >
              <Text fontWeight="semibold" mb={3}>Report Filters</Text>
              <HStack spacing={4} wrap="wrap">
                <Select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  w="150px"
                  size="sm"
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
                  size="sm"
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
                  size="sm"
                >
                  <option value="hour">Hour</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </Select>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
              </HStack>
              
              <Box mt={3} p={2} bg={filterTextBg} borderRadius="sm">
                <Text fontSize="xs" color="gray.600">
                  <strong>Applied Filters:</strong> Date Range: {filters.dateRange} | 
                  Metric: {filters.metric} | Group By: {filters.groupBy}
                </Text>
              </Box>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Available Reports */}
      <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Available Reports
        </Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
          {reportTypes.map((report) => (
            <GridItem key={report.id}>
              <Box
                p={4}
                border="1px"
                borderColor={borderColor}
                borderRadius="lg"
                _hover={{ bg: hoverBg }}
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="semibold">{report.name}</Text>
                  <Badge colorScheme="green" variant="subtle">
                    {report.status}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.500" mb={3}>
                  {report.description}
                </Text>
                <HStack justify="space-between" align="center">
                  <HStack spacing={2}>
                    <FiCalendar size={14} />
                    <Text fontSize="xs" color="gray.500">
                      {report.frequency}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <IconButton
                      size="sm"
                      icon={<FiEye />}
                      variant="ghost"
                      aria-label="View report"
                    />
                    <IconButton
                      size="sm"
                      icon={<FiDownload />}
                      variant="ghost"
                      aria-label="Download report"
                      onClick={() => handleExport(report.id, 'pdf')}
                    />
                  </HStack>
                </HStack>
                <Text fontSize="xs" color="gray.400" mt={2}>
                  Last generated: {report.lastGenerated}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Scheduled Reports */}
      <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Scheduled Reports
        </Text>
        <Text color="gray.500" textAlign="center" py={8}>
          No scheduled reports. Create automated reports to receive regular updates.
        </Text>
        <HStack justify="center">
          <Button colorScheme="brand" variant="outline">
            Schedule New Report
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
}

export default Reports 