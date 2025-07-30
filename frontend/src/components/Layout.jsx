import React, { useState } from 'react'
import {
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiHome,
  FiFileText,
  FiSettings,
  FiSun,
  FiMoon,
  FiUser,
  FiLogOut,
} from 'react-icons/fi'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()
  
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Responsive values
  const sidebarWidth = useBreakpointValue({ base: '100%', md: '280px', lg: '300px' })
  const headerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 })
  const contentPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 })
  const isMobile = useBreakpointValue({ base: true, md: false })

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiHome, label: 'Analytics', path: '/analytics' },
    { icon: FiFileText, label: 'Reports', path: '/reports' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ]

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Desktop Sidebar */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w={sidebarWidth}
        bg={bg}
        borderRight="1px"
        borderColor={borderColor}
        position="fixed"
        h="100vh"
        zIndex={10}
        overflowY="auto"
      >
        <Sidebar navItems={navItems} />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent maxW="320px">
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={borderColor}>
            <Text fontSize="lg" fontWeight="bold" color="brand.500">
              ADmyBRAND Insights
            </Text>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar navItems={navItems} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box
        flex="1"
        ml={{ base: 0, md: sidebarWidth }}
        display="flex"
        flexDirection="column"
        minW="0"
      >
        {/* Header */}
        <Box
          as="header"
          borderBottom="1px"
          borderColor={borderColor}
          px={headerPadding}
          py={{ base: 3, md: 4, lg: 5 }}
          position="sticky"
          top={0}
          zIndex={5}
          backdropFilter="blur(10px)"
          bg={useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)')}
        >
          <Flex justify="space-between" align="center" minH="60px">
            <HStack spacing={{ base: 3, md: 4 }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                icon={<FiMenu />}
                onClick={onOpen}
                variant="ghost"
                aria-label="Open menu"
                size="lg"
              />
              <Box>
                <Text 
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} 
                  fontWeight="bold"
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </Text>
                <Text 
                  fontSize={{ base: 'xs', md: 'sm' }} 
                  color="gray.500"
                  display={{ base: 'none', sm: 'block' }}
                >
                  {location.pathname === '/' ? 'Overview & Analytics' : 'Manage your data'}
                </Text>
              </Box>
            </HStack>

            <HStack spacing={{ base: 2, md: 3, lg: 4 }}>
              <IconButton
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
                size={{ base: 'md', md: 'lg' }}
              />
              
              <Menu placement="bottom-end">
                <MenuButton
                  as={Avatar}
                  size={{ base: 'sm', md: 'md' }}
                  cursor="pointer"
                  name="User"
                  src="https://bit.ly/dan-abramov"
                  _hover={{ opacity: 0.8 }}
                  transition="opacity 0.2s"
                />
                <MenuList>
                  <MenuItem icon={<FiUser />}>Profile</MenuItem>
                  <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                  <Divider />
                  <MenuItem icon={<FiLogOut />} color="red.500">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        {/* Page Content */}
        <Box 
          as="main" 
          flex="1" 
          p={contentPadding} 
          overflow="auto"
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Box maxW="1400px" mx="auto">
            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout 