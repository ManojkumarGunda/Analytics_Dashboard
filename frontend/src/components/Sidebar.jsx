import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Box,
  useColorModeValue,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FiTrendingUp } from 'react-icons/fi'

const Sidebar = ({ navItems, onClose }) => {
  const location = useLocation()
  const bg = useColorModeValue('white', 'gray.800')
  const activeBg = useColorModeValue('brand.50', 'brand.900')
  const activeColor = useColorModeValue('brand.600', 'brand.200')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  // Responsive values
  const logoSize = useBreakpointValue({ base: 6, md: 8 })
  const navItemPadding = useBreakpointValue({ base: 4, md: 3 })
  const navItemSpacing = useBreakpointValue({ base: 3, md: 2 })
  const iconSize = useBreakpointValue({ base: 6, md: 5 })

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path
    const IconComponent = item.icon

    return (
      <Link to={item.path} onClick={onClose}>
        <Box
          w="full"
          px={4}
          py={navItemPadding}
          borderRadius="lg"
          bg={isActive ? activeBg : 'transparent'}
          color={isActive ? activeColor : textColor}
          _hover={{
            bg: isActive ? activeBg : hoverBg,
            transform: 'translateX(4px)',
          }}
          transition="all 0.2s"
          cursor="pointer"
          minH={{ base: '48px', md: '40px' }}
          display="flex"
          alignItems="center"
        >
          <HStack spacing={3} w="full">
            <Icon as={IconComponent} boxSize={iconSize} />
            <Text 
              fontWeight={isActive ? 'semibold' : 'medium'}
              fontSize={{ base: 'md', md: 'sm' }}
            >
              {item.label}
            </Text>
          </HStack>
        </Box>
      </Link>
    )
  }

  return (
    <VStack
      h="full"
      bg={bg}
      spacing={0}
      align="stretch"
      py={{ base: 4, md: 6 }}
      overflowY="auto"
    >
      {/* Logo */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
        <HStack spacing={3}>
          <Icon as={FiTrendingUp} boxSize={logoSize} color="brand.500" />
          <Box>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="bold" 
              color="brand.500"
            >
              ADmyBRAND
            </Text>
            <Text 
              fontSize={{ base: 'xs', md: 'sm' }} 
              color="gray.500" 
              fontWeight="medium"
            >
              Insights
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Navigation Items */}
      <VStack spacing={navItemSpacing} px={{ base: 3, md: 4 }} flex="1">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </VStack>

      {/* Footer */}
      <Box 
        px={{ base: 4, md: 6 }} 
        pt={{ base: 4, md: 6 }} 
        borderTop="1px" 
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Text 
          fontSize={{ base: 'xs', md: 'xs' }} 
          color="gray.500" 
          textAlign="center"
        >
          © 2024 ADmyBRAND Insights
        </Text>
      </Box>
    </VStack>
  )
}

export default Sidebar 