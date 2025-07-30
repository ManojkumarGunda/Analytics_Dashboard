import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi'

const MetricCard = ({ title, value, change, icon, color }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  // Responsive values
  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 })
  const iconSize = useBreakpointValue({ base: 4, md: 5, lg: 6 })
  const valueFontSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' })
  const titleFontSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const changeFontSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const iconBoxSize = useBreakpointValue({ base: 4, md: 5 })

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dollar':
        return FiDollarSign
      case 'users':
        return FiUsers
      case 'trending':
        return FiTrendingUp
      case 'chart':
        return FiUsers
      default:
        return FiUsers
    }
  }

  const getColorScheme = (colorName) => {
    switch (colorName) {
      case 'green':
        return { bg: 'green.50', color: 'green.600', _dark: { bg: 'green.900', color: 'green.200' } }
      case 'blue':
        return { bg: 'blue.50', color: 'blue.600', _dark: { bg: 'blue.900', color: 'blue.200' } }
      case 'purple':
        return { bg: 'purple.50', color: 'purple.600', _dark: { bg: 'purple.900', color: 'purple.200' } }
      case 'orange':
        return { bg: 'orange.50', color: 'orange.600', _dark: { bg: 'orange.900', color: 'orange.200' } }
      default:
        return { bg: 'gray.50', color: 'gray.600', _dark: { bg: 'gray.900', color: 'gray.200' } }
    }
  }

  const colorScheme = getColorScheme(color)
  const IconComponent = getIcon(icon)
  const isPositive = change >= 0

  return (
    <Box
      bg={bg}
      p={padding}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      minH={{ base: '120px', md: '140px', lg: '160px' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack align="stretch" spacing={{ base: 3, md: 4 }} flex="1">
        <HStack justify="space-between" align="flex-start">
          <Box
            p={{ base: 2, md: 3 }}
            borderRadius="lg"
            {...colorScheme}
            minW={{ base: '40px', md: '48px' }}
            minH={{ base: '40px', md: '48px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={IconComponent} boxSize={iconSize} />
          </Box>
          <HStack spacing={1} align="center">
            <Icon
              as={isPositive ? FiArrowUp : FiArrowDown}
              boxSize={iconBoxSize}
              color={isPositive ? 'green.500' : 'red.500'}
            />
            <Text
              fontSize={changeFontSize}
              fontWeight="semibold"
              color={isPositive ? 'green.500' : 'red.500'}
            >
              {Math.abs(change)}%
            </Text>
          </HStack>
        </HStack>

        <VStack align="stretch" spacing={1} flex="1" justify="center">
          <Text 
            fontSize={valueFontSize} 
            fontWeight="bold"
            lineHeight="1.2"
            wordBreak="break-word"
          >
            {value}
          </Text>
          <Text 
            fontSize={titleFontSize} 
            color={textColor}
            fontWeight="medium"
          >
            {title}
          </Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export default MetricCard 