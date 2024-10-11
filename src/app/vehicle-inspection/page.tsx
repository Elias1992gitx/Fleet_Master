'use client'

import { useState, useEffect } from 'react'
import { Variants } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Plus,
  Settings,
  BarChart2,
  RefreshCcw,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Inspection {
  id: number;
  vehicle: string;
  date: string;
  status: 'Passed' | 'Failed' | 'Pending';
  inspector: string;
  score: number;
}

type SortConfig = {
  key: keyof Inspection | null;
  direction: 'ascending' | 'descending';
};

const inspectionData = [
  {
    id: 1,
    vehicle: 'Ford F-150',
    date: '2024-05-15',
    status: 'Passed',
    inspector: 'John Doe',
    score: 95,
  },
  {
    id: 2,
    vehicle: 'Toyota Camry',
    date: '2024-05-14',
    status: 'Failed',
    inspector: 'Jane Smith',
    score: 65,
  },
  {
    id: 3,
    vehicle: 'Chevrolet Silverado',
    date: '2024-05-13',
    status: 'Pending',
    inspector: 'Mike Johnson',
    score: 0,
  },
  {
    id: 4,
    vehicle: 'Honda Civic',
    date: '2024-05-12',
    status: 'Passed',
    inspector: 'Sarah Brown',
    score: 88,
  },
  {
    id: 5,
    vehicle: 'Tesla Model 3',
    date: '2024-05-11',
    status: 'Passed',
    inspector: 'Chris Lee',
    score: 98,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity },
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<Inspection[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' })
  const [activeStatus, setActiveStatus] = useState('All')

  useEffect(() => {
    const filtered = inspectionData.filter(
      (item) =>
        item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeStatus === 'All' || item.status === activeStatus)
    )
    setFilteredData(filtered as Inspection[])
  }, [searchTerm, activeStatus])

  const handleSort = (key: keyof Inspection) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  })

  const [activeMenuItem, setActiveMenuItem] = useState('vehicle-inspection')

  const statuses = ['All', 'Passed', 'Failed', 'Pending']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Failed':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'Pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <Layout activeMenuItem={activeMenuItem}> <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Vehicle Inspections
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            variants={fadeInUp as Variants}
            initial="initial"
            animate="animate"
          >
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Inspections
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">152</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pass Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Inspections
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">Next 7 days</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-between items-center mb-6"
            variants={fadeInUp as Variants}
            initial="initial"
            animate="animate"
          >
            <div className="relative mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <motion.div
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={activeStatus === status ? 'default' : 'outline'}
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="cars">Cars</SelectItem>
                  <SelectItem value="trucks">Trucks</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                <Plus className="h-4 w-4 mr-2" />
                New Inspection
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort('vehicle')}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Vehicle{' '}
                    {sortConfig.key === 'vehicle' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('date')}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Date{' '}
                    {sortConfig.key === 'date' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('status')}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Status{' '}
                    {sortConfig.key === 'status' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('inspector')}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Inspector{' '}
                    {sortConfig.key === 'inspector' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('score')}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Score{' '}
                    {sortConfig.key === 'score' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {sortedData.map((item) => (
                    <motion.tr
                      key={item.id}
                      variants={fadeInUp as Variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                    >
                      <TableCell>{item.vehicle}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <span className="ml-2">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.inspector}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{item.score}</span>
                          <Progress value={item.score} className="w-24" />
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </motion.div>
    </div></Layout>
  )
}
