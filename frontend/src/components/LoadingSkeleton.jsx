import React from 'react'
import {
  Grid,
  GridItem,
  VStack,
  Box,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react'

const LoadingSkeleton = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <VStack spacing={6} align="stretch">
      {/* Page Header Skeleton */}
      <Box>
        <Skeleton height="32px" width="300px" mb={2} />
        <Skeleton height="20px" width="400px" />
      </Box>

      {/* Metrics Cards Skeleton */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        {[1, 2, 3, 4].map((i) => (
          <GridItem key={i}>
            <Box
              bg={bg}
              p={6}
              borderRadius="xl"
              border="1px"
              borderColor={borderColor}
            >
              <VStack spacing={4} align="stretch">
                <Box display="flex" justify="space-between" align="center">
                  <Skeleton height="40px" width="40px" borderRadius="lg" />
                  <Skeleton height="20px" width="60px" />
                </Box>
                <VStack spacing={2} align="stretch">
                  <Skeleton height="32px" width="120px" />
                  <Skeleton height="16px" width="80px" />
                </VStack>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Charts Section Skeleton */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem>
          <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
            <Skeleton height="24px" width="150px" mb={4} />
            <Skeleton height="300px" />
          </Box>
        </GridItem>
        <GridItem>
          <VStack spacing={6}>
            <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
              <Skeleton height="24px" width="120px" mb={4} />
              <Skeleton height="200px" />
            </Box>
            <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
              <Skeleton height="24px" width="140px" mb={4} />
              <Skeleton height="200px" />
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Data Table Skeleton */}
      <Box bg={bg} p={6} borderRadius="xl" border="1px" borderColor={borderColor}>
        <Skeleton height="24px" width="180px" mb={4} />
        
        {/* Search and Controls Skeleton */}
        <Box display="flex" justify="space-between" mb={6}>
          <Box display="flex" gap={4}>
            <Skeleton height="40px" width="300px" />
            <Skeleton height="40px" width="120px" />
          </Box>
          <Skeleton height="20px" width="200px" />
        </Box>

        {/* Table Skeleton */}
        <Box>
          <Skeleton height="40px" mb={2} />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="50px" mb={1} />
          ))}
        </Box>

        {/* Pagination Skeleton */}
        <Box display="flex" justify="space-between" mt={6}>
          <Skeleton height="20px" width="100px" />
          <Box display="flex" gap={2}>
            <Skeleton height="32px" width="32px" />
            <Skeleton height="32px" width="32px" />
            <Skeleton height="32px" width="32px" />
            <Skeleton height="32px" width="32px" />
            <Skeleton height="32px" width="32px" />
          </Box>
        </Box>
      </Box>
    </VStack>
  )
}

export default LoadingSkeleton 