import React, { useState, useMemo } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Select,
  HStack,
  Text,
  Button,
  IconButton,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi'

const DataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === 'date') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (sortField === 'amount') {
        aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''))
        bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''))
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [data, searchTerm, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + pageSize)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'failed':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Box>
      {/* Search and Controls */}
      <HStack spacing={4} mb={6} justify="space-between">
        <HStack spacing={4}>
          <Box position="relative">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pl={10}
              w="300px"
            />
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color={textColor} />
            </Box>
          </Box>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            w="120px"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </Select>
        </HStack>
        <Text fontSize="sm" color={textColor}>
          Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredAndSortedData.length)} of{' '}
          {filteredAndSortedData.length} results
        </Text>
      </HStack>

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th
                cursor="pointer"
                onClick={() => handleSort('id')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                ID
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort('customer')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                Customer
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort('amount')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                Amount
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort('status')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                Status
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort('date')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((item) => (
              <Tr key={item.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                <Td fontWeight="semibold">#{item.id}</Td>
                <Td>{item.customer}</Td>
                <Td fontWeight="semibold">{item.amount}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(item.status)} variant="subtle">
                    {item.status}
                  </Badge>
                </Td>
                <Td>{new Date(item.date).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <HStack justify="space-between" mt={6}>
        <Text fontSize="sm" color={textColor}>
          Page {currentPage} of {totalPages}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<FiChevronLeft />}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            isDisabled={currentPage === 1}
            size="sm"
            variant="ghost"
          />
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? 'solid' : 'ghost'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            )
          })}
          <IconButton
            icon={<FiChevronRight />}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            isDisabled={currentPage === totalPages}
            size="sm"
            variant="ghost"
          />
        </HStack>
      </HStack>
    </Box>
  )
}

export default DataTable 